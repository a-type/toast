import { Request, Response } from 'express';
import ApiError from '../ApiError';
import { saveFromUrl } from '../services/images/images';
import lookupFoods from '../services/lookupFoods';
import neo4j from '../services/neo4j';
import parser from '../services/parser';
import { ParseResult } from '../services/parser/parser';
import scraper from '../services/scraper';
import { id, timestamp } from '../tools';

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

  const session = neo4j.session();
  const time = timestamp();

  let defaultCollectionId = await session.readTransaction(async tx => {
    const result = await tx.run(
      `
      MATCH (:User{id: $userId})-[:MEMBER_OF]->(:Group)-[:HAS_COLLECTION]->(collection:RecipeCollection{default:true})
      RETURN collection {.id}
      `,
      { userId },
    );

    if (!result.records.length) {
      return null;
    }

    return result.records[0].get('collection').id;
  });

  if (!defaultCollectionId) {
    defaultCollectionId = await session.writeTransaction(async tx => {
      const result = await tx.run(
        `
        MATCH (:User{id: $userId})-[:MEMBER_OF]->(group:Group)
        CREATE (group)-[:HAS_COLLECTION]->(collection:RecipeCollection{default: true, id: $collectionId, name: "Saved"})
        RETURN collection {.id}
        `,
        {
          userId,
          collectionId: id('recipeCollection'),
        },
      );

      return result.records[0].get('collection').id;
    });
  }

  const existingRecipeId = await session.readTransaction(async tx => {
    let recipeId: string;

    /**
     * Check if the recipe is already scanned
     */
    const existing = await tx.run(
      `
      MATCH (recipe:Recipe {sourceUrl: $sourceUrl})
      WHERE coalesce(recipe.published, false) = true AND coalesce(recipe.private, false) = false
      RETURN recipe {.id}
      `,
      {
        sourceUrl,
      },
    );

    if (existing.records.length) {
      // like existing recipe
      recipeId = existing.records[0].get('recipe').id;

      await tx.run(
        `
        MATCH (recipe:Recipe{id: $recipeId}), (recipeCollection:Collection{id:$collectionId})
        CREATE (collection)<-[:COLLECTED_IN]-(recipe)
        `,
        {
          userId,
          recipeId,
          collectionId: defaultCollectionId,
        },
      );

      return recipeId;
    } else {
      return null;
    }
  });

  /**
   * Exit early if recipe has already been processed
   */
  if (existingRecipeId) {
    result.recipeId = existingRecipeId;
    return res.send(result);
  } else {
    /**
     * Scrape recipe
     */
    const scraped = await scraper(sourceUrl);

    if (!scraped.title && !scraped.ingredients.length) {
      throw new ApiError(
        "We couldn't extract any recipe data from the provided webpage.",
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
        session,
        parsedIngredients.map(parsed => parsed.food.normalized),
      );

      // if any null, add problem and create new foods for them
      if (foundFoods.some(food => !food)) {
        result.problems.push(RecipeLinkProblem.IncompleteIngredients);
        parsedIngredients
          .filter((_, idx) => !foundFoods[idx])
          .reduce<Promise<any>>(async (prevOperation, parsed, idx) => {
            await prevOperation;
            try {
              const foodName = parsed.food.normalized;
              const result = await session.writeTransaction(async tx =>
                tx.run(
                  `
              CREATE (food:Food {id: $id, name: $name, alternateNames: [], searchHelpers: [], verified: false})
              RETURN food
              `,
                  {
                    id: id(foodName),
                    name: foodName,
                  },
                ),
              );
              const food = result.records[0].get('food');
              foundFoods[idx] = food;
            } catch (err) {
              console.error(
                'Failed to create food ' + parsed.food.normalized,
                err,
              );
            }
          }, Promise.resolve());
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
    result.recipeId = await session.writeTransaction(async tx => {
      const createResult = await tx.run(
        `
        MERGE (recipe:Recipe {sourceUrl:$sourceUrl})
          ON CREATE SET recipe += $input, recipe.id = $id, recipe.private = false, recipe.published = true
        WITH recipe
        MATCH (user:User {id:$userId}), (collection:RecipeCollection{id: $collectionId})
        CREATE (user)-[:DISCOVERER_OF]->(recipe)
        CREATE (collection)<-[:COLLECTED_IN]-(recipe)
        RETURN recipe {.id}
        `,
        {
          sourceUrl: recipeData.sourceUrl,
          input: {
            ...recipeData,
            displayType: 'LINK',
            published: true,
            createdAt: time,
            updatedAt: time,
            viewedAt: time,
          },
          id: id(scraped.title || 'recipe'),
          userId,
          collectionId: defaultCollectionId,
        },
      );

      return createResult.records[0].get('recipe').id;
    });

    if (ingredients) {
      try {
        await session.writeTransaction(async tx => {
          await Promise.all(
            ingredients.map(async found => {
              const { foodId, ...rest } = found;

              const query = foodId
                ? `
                MATCH (recipe:Recipe {id: $recipeId}), (food:Food {id: $foodId})
                OPTIONAL MATCH (recipe)<-[allRels:INGREDIENT_OF]-()
                WITH recipe, count(allRels) as index, food
                CREATE (recipe)<-[rel:INGREDIENT_OF { index: index }]-(ingredient:Ingredient $props)<-[:USED_IN]-(food)
                RETURN ingredient {.id}
                `
                : `
                MATCH (recipe:Recipe {id: $recipeId})
                OPTIONAL MATCH (recipe)<-[allRels:INGREDIENT_OF]-()
                WITH recipe, count(allRels) as index
                CREATE (recipe)<-[rel:INGREDIENT_OF { index: index }]-(ingredient:Ingredient $props)
                RETURN ingredient {.id}
            `;

              await tx.run(query, {
                recipeId: result.recipeId,
                foodId,
                props: {
                  ...rest,
                  id: id('ingredient'),
                },
              });
            }),
          );
        });
      } catch (err) {
        console.error(
          'Ingredient links failed for linked recipe',
          result.recipeId,
        );
        console.error(err);
        result.problems.push(RecipeLinkProblem.FailedIngredients);
      }
    }

    if (image) {
      try {
        await session.writeTransaction(async tx => {
          await tx.run(
            `
            MATCH (recipe:Recipe{id: $recipeId})
            SET recipe.coverImageId = $props.id, recipe.coverImageUrl = $props.url, recipe.coverImageAttribution = $props.attribution
            RETURN recipe {.id}
            `,
            {
              recipeId: result.recipeId,
              props: {
                ...image,
                attribution: scraped.attribution,
              },
            },
          );
        });
      } catch (err) {
        console.error('Image link failed for linked recipe ', result.recipeId);
        console.error(err);
        result.problems.push(RecipeLinkProblem.FailedImage);
      }
    }

    res.send(result);
  }
};
