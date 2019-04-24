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

  input RecipeIngredientParseInput {
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
    addRecipeIngredient(
      recipeId: ID!
      ingredientText: String!
    ): RecipeIngredient!
      @authenticated
      @generateId(type: "recipeIngredient")
      @cypher(
        statement: """
        MATCH (:User{id:$cypherParams.userId})-[:AUTHOR_OF]->(recipe:Recipe{id:$recipeId}),
          (ingredient:Ingredient{id:$ingredientId})
        CREATE (recipeIngredient:RecipeIngredient {id:$id})
        CREATE (recipeIngredient)<-[:USED_IN]-(ingredient)
        CREATE (recipe)<-[:INGREDIENT_OF]-(recipeIngredient)
        SET recipeIngredient += $parsed
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
        CALL apoc.when(ingredient IS NOT NULL, 'DELETE oldRel; CREATE (recipeIngredient)<-[:USED_IN]-(ingredient)', '', {recipeIngredient:recipeIngredient, ingredient:ingredient, oldRel:oldRel}) YIELD value
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
    addRecipeIngredient: async (parent, args, ctx: Context, info) => {
      const [parsed] = await ctx.scanning.parseIngredients([
        args.ingredientText,
      ]);

      return neo4jgraphql(parent, { ...args, parsed }, ctx, info);
    },

    deleteRecipeIngredient: neo4jgraphql,

    updateRecipeIngredient: neo4jgraphql,
  },
};
