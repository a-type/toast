import scraper from '../services/scraper';
import parser from '../services/parser';
import neo4j from '../services/neo4j';
import lookupIngredients from '../services/lookupIngredients';
import { Request, Response } from 'express';
import { timestamp, id } from '../tools';
import { saveFromUrl } from '../services/images/images';
import { ParseResult } from '../services/parser/parser';
import ApiError from '../ApiError';

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
  ingredientStart: number;
  ingredientEnd: number;
  unitStart: number;
  unitEnd: number;
  quantityStart: number;
  quantityEnd: number;
  comments: string[];
  preparations: string[];
  ingredientId?: string;
  ingredientText: string;
};

const parsedToRecipeIngredient = (
  parsed: ParseResult,
  ingredientId: string,
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
    ingredientStart: getOrNull(parsed.ingredient.range, 0),
    ingredientEnd: getOrNull(parsed.ingredient.range, 1),
    text: parsed.original,
    ingredientId,
    comments: parsed.comments,
    preparations: parsed.preparations,
    ingredientText: parsed.ingredient && parsed.ingredient.normalized,
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

  const existingRecipeId = await session.readTransaction(async tx => {
    let recipeId: string;

    /**
     * Check if the recipe is already scanned
     */
    const existing = await tx.run(
      `
      MATCH (recipe:Recipe {sourceUrl: $sourceUrl})
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
        MATCH (user:User{id: $userId}), (recipe:Recipe{id: $recipeId})
        CREATE (user)-[:SAVED {collection: "liked"}]->(recipe)
        `,
        {
          userId,
          recipeId,
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
      const foundIngredients = await lookupIngredients(
        session,
        parsedIngredients.map(parsed => parsed.ingredient.normalized),
      );

      // if any null, add problem
      if (foundIngredients.some(ingredient => !ingredient)) {
        result.problems.push(RecipeLinkProblem.IncompleteIngredients);
      }

      ingredients = parsedIngredients.map((parsed, idx) =>
        parsedToRecipeIngredient(
          parsed,
          foundIngredients[idx] && foundIngredients[idx].id,
        ),
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
          ON CREATE SET recipe += $input, recipe.id = $id
        WITH recipe
        MATCH (user:User {id:$userId})
        CREATE (user)-[:DISCOVERER_OF]->(recipe)
        CREATE (user)-[:SAVED {collection: "liked"}]->(recipe)
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
        },
      );

      return createResult.records[0].get('recipe').id;
    });

    if (ingredients) {
      try {
        await session.writeTransaction(async tx => {
          await Promise.all(
            ingredients.map(async found => {
              const { ingredientId, ...rest } = found;

              const query = ingredientId
                ? `
                MATCH (recipe:Recipe {id: $recipeId}), (ingredient:Ingredient {id: $ingredientId})
                OPTIONAL MATCH (recipe)<-[allRels:INGREDIENT_OF]-()
                WITH recipe, count(allRels) as index, ingredient
                CREATE (recipe)<-[rel:INGREDIENT_OF { index: index }]-(recipeIngredient:RecipeIngredient $props)<-[:USED_IN]-(ingredient)
                RETURN recipeIngredient {.id}
                `
                : `
                MATCH (recipe:Recipe {id: $recipeId})
                OPTIONAL MATCH (recipe)<-[allRels:INGREDIENT_OF]-()
                WITH recipe, count(allRels) as index
                CREATE (recipe)<-[rel:INGREDIENT_OF { index: index }]-(recipeIngredient:RecipeIngredient $props)
                RETURN recipeIngredient {.id}
            `;

              await tx.run(query, {
                recipeId: result.recipeId,
                ingredientId,
                props: {
                  ...rest,
                  id: id('recipeIngredient'),
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
            CREATE (recipe)-[:COVER_IMAGE]->(image:Image {id: $props.id, url: $props.url, attribution: $props.attribution})
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
