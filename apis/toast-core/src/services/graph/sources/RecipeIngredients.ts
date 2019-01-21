import Source from './Source';
import { id } from 'tools';
import logger from 'logger';
import { ApolloError } from 'apollo-server-core';
import { StatementResult } from 'neo4j-driver/types/v1';

export interface RecipeIngredient {
  id: string;
  unit: string;
  value: number;
  text: string;
  // text ranges for matched text
  ingredientStart: number;
  ingredientEnd: number;
  unitStart: number;
  unitEnd: number;
  valueStart: number;
  valueEnd: number;

  comments: string[];
  preparations: string[];

  index: number;

  ingredientId?: string;
}

export default class RecipeIngredients extends Source<RecipeIngredient> {
  relationDbFields = '.index';

  constructor(ctx, graph) {
    super(
      ctx,
      graph,
      'RecipeIngredient',
      [
        'id',
        'unit',
        'value',
        'text',
        'ingredientStart',
        'ingredientEnd',
        'unitStart',
        'unitEnd',
        'valueStart',
        'valueEnd',
        'comments',
        'preparations',
      ],
      {
        value: 1,
        comments: [],
        preparations: [],
        index: 0,
      },
    );
  }

  private hydrateOneWithIndex = (result: StatementResult): RecipeIngredient => {
    const ri = this.hydrateOne(result);
    if (ri) {
      return { ...ri, index: result.records[0].get('rel').index };
    }
    return ri;
  };

  private hydrateListWithIndex = (
    result: StatementResult,
  ): RecipeIngredient[] => {
    const list = this.hydrateList(result);
    if (list.length) {
      return list.map((ri, idx) => ({
        ...ri,
        index: result.records[idx].get('rel').index,
      }));
    }
    return list;
  };

  create = (recipeId: string, input: Partial<RecipeIngredient>) =>
    this.ctx.writeTransaction(async tx => {
      const { ingredientId, ...params } = input;

      const query = ingredientId
        ? `
        MATCH (recipe:Recipe {id: $recipeId}), (ingredient:Ingredient {id: $ingredientId})
        OPTIONAL MATCH (recipe)<-[allRels:INGREDIENT_OF]-()
        WITH recipe, count(allRels) as index, ingredient
        CREATE (recipe)<-[rel:INGREDIENT_OF { index: index }]-(recipeIngredient:RecipeIngredient $props)<-[:USED_IN]-(ingredient)
        RETURN recipeIngredient {${this.dbFields}}, rel {${
            this.relationDbFields
          }}
        `
        : `
        MATCH (recipe:Recipe {id: $recipeId})
        OPTIONAL MATCH (recipe)<-[allRels:INGREDIENT_OF]-()
        WITH recipe, count(allRels) as index
        CREATE (recipe)<-[rel:INGREDIENT_OF { index: index }]-(recipeIngredient:RecipeIngredient $props)
        RETURN recipeIngredient {${this.dbFields}}, rel {${
            this.relationDbFields
          }}
        `;

      const result = await tx.run(query, {
        recipeId,
        ingredientId,
        props: {
          ...params,
          id: id('recipeIngredient'),
        },
      });

      return this.hydrateOneWithIndex(result);
    });

  getForRecipe = (recipeId: string) =>
    this.ctx.readTransaction(async tx => {
      const result = await tx.run(
        `
          MATCH (recipe:Recipe {id: $recipeId})<-[rel:INGREDIENT_OF]-(recipeIngredient:RecipeIngredient)
          RETURN recipeIngredient {${this.dbFields}}, rel {${
          this.relationDbFields
        }}
        `,
        {
          recipeId,
        },
      );

      return this.hydrateListWithIndex(result);
    });

  update = (recipeIngredientId: string, input: Partial<RecipeIngredient>) =>
    this.ctx.writeTransaction(async tx => {
      const { ingredientId, ...params } = input;

      if (ingredientId) {
        const refactorResult = await tx.run(
          `
            MATCH (:RecipeIngredient {id: $recipeIngredientId})<-[rel:USED_IN]-(),
              (ingredient:Ingredient {id: $ingredientId})
            CALL apoc.refactor.from(rel, ingredient) YIELD input, output, error
            RETURN error
          `,
          {
            recipeIngredientId,
            ingredientId,
          },
        );

        if (
          !refactorResult.records.length ||
          refactorResult.records[0].get('error')
        ) {
          logger.warn(refactorResult.records[0].get('error'));
          throw new ApolloError(
            "We couldn't change the ingredient. Trying again may help.",
          );
        }
      }

      const result = await tx.run(
        `
          MATCH (recipeIngredient:RecipeIngredient {id: $recipeIngredientId })-[rel:INGREDIENT_OF]->()
          SET recipeIngredient += $params
          RETURN recipeIngredient {${this.dbFields}}, rel {${
          this.relationDbFields
        }}
        `,
        {
          recipeIngredientId,
          params,
        },
      );

      return this.hydrateOneWithIndex(result);
    });

  isPartOfRecipeAuthoredByUser = (recipeIngredientId: string, userId: string) =>
    this.ctx.readTransaction(async tx => {
      const result = await tx.run(
        `
          MATCH (user:User {id: $userId})-[:AUTHOR_OF]->(recipe:Recipe)<-[:INGREDIENT_OF]-(recipeIngredient:RecipeIngredient {id: $recipeIngredientId})
          RETURN recipe {.id}
        `,
        {
          recipeIngredientId,
          userId,
        },
      );
      return result.records.length > 0;
    });

  delete = (recipeIngredientId: string) =>
    this.ctx.writeTransaction(async tx => {
      const result = await tx.run(
        `
        MATCH (recipe:Recipe)<-[rel:Ingredient_OF]-(recipeIngredient:RecipeIngredient {id: $recipeIngredientId})
        DETACH DELETE recipeIngredient
        RETURN recipe {${this.graph.recipes.dbFields}}
      `,
        {
          recipeIngredientId,
        },
      );

      if (result.records.length) {
        return this.graph.recipes.hydrateOne(result);
      }
    });
}
