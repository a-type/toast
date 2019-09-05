import { Request, Response } from 'express';
import { saveFromUrl } from '../services/images/images';
import lookupFoods from '../services/lookupFoods';
import { ApiError, aqlQuery, aql } from 'toast-common';
import parser from '../services/parser';
import { ParseResult } from '../services/parser/parser';
import scraper from '../services/scraper';

enum RecipeLinkProblem {
  FailedIngredients = 'FailedIngredients',
  IncompleteIngredients = 'IncompleteIngredients',
  FailedImage = 'FailedImage',
}

interface RecipeLinkResult {
  recipeId: string;
  problems: RecipeLinkProblem[];
}

type RecipeIngredient = {
  id?: string;
  text: string;
  unit: string;
  quantity: number;
  foodStart: number;
  foodEnd: number;
  unitStart: number;
  unitEnd: number;
  quantityStart: number;
  quantityEnd: number;
  comments: string[];
  preparations: string[];
  foodId?: string;
  foodText: string;
};

const parsedToRecipeIngredient = (
  parsed: ParseResult,
  foodId: string,
): RecipeIngredient => {
  const getOrNull = (range: [number, number] | [], index: number): number =>
    range[index] !== undefined ? range[index] : null;

  return {
    unit: parsed.unit.normalized,
    unitStart: getOrNull(parsed.unit.range, 0),
    unitEnd: getOrNull(parsed.unit.range, 1),
    quantity: parsed.quantity.normalized,
    quantityStart: getOrNull(parsed.quantity.range, 0),
    quantityEnd: getOrNull(parsed.quantity.range, 1),
    foodStart: getOrNull(parsed.food.range, 0),
    foodEnd: getOrNull(parsed.food.range, 1),
    text: parsed.original,
    foodId,
    comments: parsed.comments,
    preparations: parsed.preparations,
    foodText: parsed.food && parsed.food.normalized,
  };
};

export default async (req: Request, res: Response) => {
  const {
    sourceUrl: fullSourceUrl,
    userId,
  }: { sourceUrl: string; userId: string } = req.body;

  if (!fullSourceUrl) {
    throw new ApiError('Parameter sourceUrl is required', 400);
  } else if (!userId) {
    throw new ApiError('Parameter userId is required', 400);
  }

  const result: RecipeLinkResult = {
    recipeId: null,
    problems: [],
  };

  // removing query string
  const sourceUrl = fullSourceUrl.replace(/\?.*/, '');

  const collectionResult = await aqlQuery(aql`
    LET group = FIRST(
      FOR group_0 IN OUTBOUND DOCUMENT(Users, ${userId}) MemberOf
        LIMIT 1
        RETURN group_0
    )
    RETURN FIRST(
      FOR n IN OUTBOUND group HasRecipeCollection
        FILTER n.name == "Scanned Recipes"
        LIMIT 1
        RETURN n
    )
  `);

  let collection = collectionResult.hasNext()
    ? await collectionResult.next()
    : null;
  if (!collection) {
    const createCollectionResult = await aqlQuery(aql`
      LET group = FIRST(
        FOR group_0 IN OUTBOUND DOCUMENT(Users, ${userId}) MemberOf
          LIMIT 1
          RETURN group_0
      )
      LET newCollection = FIRST(INSERT { name: "Scanned Recipes" } INTO RecipeCollections RETURN NEW)
      LET edge = FIRST(INSERT { _from: group._id, _to: newCollection._id } INTO HasRecipeCollection RETURN NEW)
      RETURN newCollection
    `);
    if (!createCollectionResult.hasNext()) {
      throw new ApiError(
        'Could not create a collection to store saved recipes',
        500,
      );
    }
    collection = await createCollectionResult.next();
  }

  const { _key: collectionId } = collection;

  const existingRecipeResult = await aqlQuery(aql`
    FOR recipe IN Recipes
      FILTER recipe.sourceUrl == ${sourceUrl}
      LIMIT 1
      RETURN recipe
  `);

  if (existingRecipeResult.hasNext()) {
    // collect existing recipe and complete
    const existingRecipe = await existingRecipeResult.next();
    await aqlQuery(aql`
      LET recipe = DOCUMENT(Recipes, ${existingRecipe._key})
      LET collection = DOCUMENT(RecipeCollections, ${collectionId})
      INSERT {
        _to: collection._id,
        _from: recipe._id
      } INTO CollectedIn
      RETURN recipe
    `);

    result.recipeId = existingRecipe._key;
    return res.send(result);
  }

  /**
   * Scrape recipe
   */
  const scraped = await scraper(sourceUrl);

  if (!scraped.title && !scraped.ingredients.length) {
    throw new ApiError(
      `We couldn't extract any recipe data from the provided webpage: ${sourceUrl}`,
      400,
    );
  }

  const recipeData = {
    title: scraped.title || `Scanned Recipe (${sourceUrl})`,
    description: scraped.description,
    attribution: scraped.attribution || sourceUrl,
    cookTime: scraped.cookTimeMinutes,
    prepTime: scraped.prepTimeMinutes,
    unattendedTime: scraped.unaccountedForTimeMinutes,
    servings: scraped.servings || 1,
    sourceUrl,
    locked: scraped.title && scraped.ingredients.length > 3,
  };

  /**
   * Parse ingredients
   */
  let ingredients: RecipeIngredient[] = [];
  if (!scraped.ingredients.length) {
    // no ingredients, add problem
    result.problems.push(RecipeLinkProblem.FailedIngredients);
  } else {
    // parse strings
    const parsedIngredients = scraped.ingredients.map(parser);
    // search db for matches or null
    const foundFoods = await lookupFoods(
      parsedIngredients.map(parsed => parsed.food.normalized),
    );

    // if any null, add problem and create new foods for them
    if (foundFoods.some(food => !food)) {
      console.info(
        `Could not find foods for: `,
        parsedIngredients
          .filter((_, idx) => !foundFoods[idx])
          .map(ing => ing.food.normalized)
          .join(', '),
      );

      for (let i = 0; i < parsedIngredients.length; i++) {
        if (!foundFoods[i]) {
          const parsed = parsedIngredients[i];
          try {
            const foodName = parsed.food.normalized;
            const result = await aqlQuery(aql`
              INSERT {
                name: ${foodName},
                alternateNames: [],
                searchHelpers: [],
                verified: false
              } INTO Foods
              RETURN NEW
            `);

            const food = await result.next();
            console.log(food);
            foundFoods[i] = {
              id: food._key,
              name: food.name,
            };
          } catch (err) {
            if (err.statusCode === 409) {
              const result = await aqlQuery(aql`
                FOR food IN Foods
                  FILTER food.name == ${parsed.food.normalized}
                  LIMIT 1
                  RETURN food
              `);

              if (!result.hasNext()) {
                // this is weird. we got a conflict but no duplicate food
                console.error(
                  `Food creation conflicted, but no duplicate food found by name ${parsed.food.normalized}`,
                );
              } else {
                const food = await result.next();
                foundFoods[i] = {
                  id: food._key,
                  name: food.name,
                };
              }
            } else {
              console.error(
                'Failed to create food ' + parsed.food.normalized,
                err,
              );
              result.problems.push(RecipeLinkProblem.IncompleteIngredients);
            }
          }
        }
      }
    }

    ingredients = parsedIngredients.map((parsed, idx) =>
      parsedToRecipeIngredient(parsed, foundFoods[idx] && foundFoods[idx].id),
    );
  }

  /**
   * Copy image
   */
  let image: { id: string; url: string } = null;
  if (scraped.image) {
    try {
      image = await saveFromUrl(scraped.image);
    } catch (err) {
      console.error('Image upload failed for link recipe', err);
      result.problems.push(RecipeLinkProblem.FailedImage);
    }
  }

  /**
   * Create recipe and associate ingredients
   */
  const time = new Date().getTime();
  const recipeResult = await aqlQuery(aql`
      LET user = DOCUMENT(Users, ${userId})
      LET collection = DOCUMENT(RecipeCollections, ${collectionId})
      LET recipe = FIRST(
        INSERT {
          sourceUrl: ${sourceUrl},
          private: false,
          published: true,
          title: ${recipeData.title},
          description: ${recipeData.description || null},
          attribution: ${recipeData.attribution || null},
          cookTime: ${recipeData.cookTime || null},
          prepTime: ${recipeData.prepTime || null},
          unattendedTime: ${recipeData.unattendedTime || null},
          servings: ${recipeData.servings || 1},
          locked: ${recipeData.locked || false},
          displayType: 'LINK',
          createdAt: ${time},
          updatedAt: ${time},
          viewedAt: ${time},
          coverImageUrl: ${image ? image.url : null},
          coverImageId: ${image ? image.id : null}
        } INTO Recipes
        RETURN NEW
      )
      LET collRes = (
        INSERT { _from: recipe._id, _to: collection._id } INTO CollectedIn RETURN NEW
      )
      LET discoverRes = (
        INSERT { _from: user._id, _to: recipe._id } INTO DiscovererOf
      )
      RETURN recipe
    `);

  const recipe = await recipeResult.next();
  result.recipeId = recipe._key;

  if (ingredients) {
    await Promise.all(
      ingredients.map(async (found, index) => {
        try {
          if (!found.foodId) {
            console.error(`Failed to create food for ${JSON.stringify(found)}`);
            result.problems.push(RecipeLinkProblem.IncompleteIngredients);
          } else {
            await aqlQuery(aql`
              LET recipe = DOCUMENT(Recipes, ${recipe._key})
              LET food = DOCUMENT(Foods, ${found.foodId})
              LET ingredient = FIRST(
                INSERT {
                  text: ${found.text},
                  foodStart: ${found.foodStart},
                  foodEnd: ${found.foodEnd},
                  quantity: ${found.quantity || 0},
                  quantityStart: ${found.quantityStart},
                  quantityEnd: ${found.quantityEnd},
                  unit: ${found.unit || null},
                  unitStart: ${found.unitStart},
                  unitEnd: ${found.unitEnd}
                } INTO Ingredients
                RETURN NEW
              )
              LET usedEdge = FIRST(
                INSERT {
                  _from: food._id,
                  _to: ingredient._id
                } INTO UsedIn
                RETURN NEW
              )
              LET ingredientEdge = FIRST(
                INSERT {
                  _from: ingredient._id,
                  _to: recipe._id,
                  index: ${index}
                } INTO IngredientOf
                RETURN NEW
              )
              RETURN ingredient
            `);
          }
        } catch (err) {
          console.error(
            `Ingredient link failed for ingredient ${JSON.stringify(
              found,
            )} linked recipe`,
            result.recipeId,
          );
          console.error(err);
          result.problems.push(RecipeLinkProblem.FailedIngredients);
        }
      }),
    );
  }

  res.send(result);
};
