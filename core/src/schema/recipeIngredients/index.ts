import { gql } from 'apollo-server-express';
import { Context } from 'context';
import { neo4jgraphql } from 'neo4j-graphql-js';

export const typeDefs = gql`
  type RecipeIngredient {
    id: ID!
    text: String!
    ingredientStart: Int
    ingredientEnd: Int
    recipe: Recipe!
    unit: String
    unitStart: Int
    unitEnd: Int
    quantity: Float!
    quantityStart: Int
    quantityEnd: Int
    comments: [String!]!
    preparations: [String!]!
  }

  input RecipeIngredientCreateInput {
    text: String!
  }

  input RecipeIngredientUpdateInput {
    unit: String
    unitStart: Int
    unitEnd: Int
    quantity: Float
    quantityStart: Int
    quantityEnd: Int
    ingredientId: ID
    ingredientStart: Int
    ingredientEnd: Int
    comments: [String!]
    preparations: [String!]
  }

  extend type Recipe {
    ingredients: [RecipeIngredient!]!
      @relation(name: "INGREDIENT_OF", direction: "IN")
  }

  extend type Mutation {
    createRecipeIngredient(
      recipeId: ID!
      input: RecipeIngredientCreateInput!
    ): RecipeIngredient!
      @authenticated
      @generateId(type: "recipeIngredient")
      @cypher(
        statement: """
        MATCH (:User{id:$cypherParams.userId})-[:AUTHOR_OF]->(recipe:Recipe{id:$recipeId})
        OPTIONAL MATCH (ingredient:Ingredient{id:$ingredientId})
        CREATE (recipeIngredient:RecipeIngredient {id:$id})
        CREATE (recipe)<-[:INGREDIENT_OF]-(recipeIngredient)
        SET recipeIngredient += $parsed
        WITH recipeIngredient, ingredient
        CALL apoc.do.when(ingredient IS NOT NULL, 'CREATE (recipeIngredient)<-[:USED_IN]-(ingredient) RETURN recipeIngredient', '', {recipeIngredient:recipeIngredient, ingredient:ingredient}) YIELD value
        RETURN recipeIngredient
        """
      )

    updateRecipeIngredient(
      id: ID!
      input: RecipeIngredientUpdateInput!
    ): RecipeIngredient
      @authenticated
      @cypher(
        statement: """
        MATCH (:User{id:$cypherParams.userId})-[:AUTHOR_OF]->(:Recipe)<-[:INGREDIENT_OF]-(recipeIngredient:RecipeIngredient{id:$id})
        SET recipeIngredient += $input
        WITH recipeIngredient
        MATCH (ingredient:Ingredient{id:$input.ingredientId}), (recipeIngredient)<-[oldRel:USED_IN]-()
        CALL apoc.do.when(ingredient IS NOT NULL, 'DELETE oldRel; CREATE (recipeIngredient)<-[:USED_IN]-(ingredient)', '', {recipeIngredient:recipeIngredient, ingredient:ingredient, oldRel:oldRel}) YIELD value
        WITH recipeIngredient
        RETURN recipeIngredient
        """
      )

    deleteRecipeIngredient(id: ID!): RecipeIngredient
      @authenticated
      @cypher(
        statement: """
        MATCH (:User{id:$cypherParams.userId})-[:AUTHOR_OF]->(:Recipe)<-[:INGREDIENT_OF]-(recipeIngredient:RecipeIngredient{id:$id})
        DETACH DELETE recipeIngredient
        RETURN recipeIngredient
        """
      )
  }
`;

export const resolvers = {
  Recipe: {
    ingredients: parent => {
      if (parent.ingredients) {
        return parent.ingredients;
      }

      return [];
    },

    steps: parent => {
      if (parent.steps) {
        return parent.steps;
      }

      return [];
    },
  },

  RecipeIngredient: {
    quantity: parent => parent.quantity || 1,
    comments: parent => parent.comments || [],
    preparations: parent => parent.preparations || [],
  },

  Mutation: {
    createRecipeIngredient: async (parent, args, ctx: Context, info) => {
      const [parsedResult] = await ctx.scanning.parseIngredients([
        args.input.text,
      ]);

      const parsed = {
        text: parsedResult.original,
        unit: parsedResult.unit && parsedResult.unit.normalized,
        unitStart: parsedResult.unit && parsedResult.unit.range[0],
        unitEnd: parsedResult.unit && parsedResult.unit.range[1],
        quantity: parsedResult.quantity && parsedResult.quantity.normalized,
        quantityStart: parsedResult.quantity && parsedResult.quantity.range[0],
        quantityEnd: parsedResult.quantity && parsedResult.quantity.range[1],
        ingredientStart:
          parsedResult.ingredient && parsedResult.ingredient.range[0],
        ingredientEnd:
          parsedResult.ingredient && parsedResult.ingredient.range[1],
        comments: parsedResult.comments,
        preparations: parsedResult.preparations,
      };

      return await neo4jgraphql(
        parent,
        {
          ...args,
          parsed,
          ingredientId:
            (parsedResult.ingredient && parsedResult.ingredient.id) || '',
        },
        ctx,
        info,
      );
    },

    deleteRecipeIngredient: neo4jgraphql,

    updateRecipeIngredient: neo4jgraphql,
  },
};
