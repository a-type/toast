import { gql } from 'apollo-server-core';

export default gql`
  type Recipe {
    id: ID!
    title: String!

    description: String
    attribution: String
    sourceUrl: String
    servings: Int!
    """
    In minutes
    """
    cookTime: Int
    """
    In minutes
    """
    prepTime: Int
    """
    In minutes
    """
    unattendedTime: Int

    coverImageUrl: String
    coverImageAttribution: String

    createdAt: Date!
    updatedAt: Date!
    viewedAt: Date!
    views: Int!

    published: Boolean!
    private: Boolean!
    locked: Boolean!

    steps: [String!]
    ingredientsConnection: RecipeIngredientConnection!

    containedInViewerCollectionsConnection: RecipeRecipeCollectionConnection!
      @authenticated
  }

  type RecipeRecipeCollectionConnection @cypherVirtual {
    nodes: [RecipeCollection!]!
      @cypherCustom(
        statement: """
        MATCH (parent)-[:COLLECTED_IN]->
          (collection:RecipeCollection)<-[:HAS_COLLECTION]-(:Group)
          <-[:MEMBER_OF]-(:User{id:$context.userId})
        RETURN collection
        """
      )
  }

  type RecipeCollection {
    id: ID!
    name: String!
    default: Boolean!
    createdAt: Date!

    recipesConnection: RecipeCollectionRecipeConnection!
  }

  type RecipeCollectionRecipeConnection @cypherVirtual {
    nodes: [Recipe!]! @cypherNode(relationship: "COLLECTED_IN", direction: IN)
  }

  type RecipeIngredientConnection @cypherVirtual {
    nodes: [Ingredient!]!
      @cypherNode(relationship: "INGREDIENT_OF", direction: IN)
    edges: [RecipeIngredientEdge!]!
      @cypherRelationship(type: "INGREDIENT_OF", direction: IN)
  }

  type RecipeIngredientEdge {
    node: Ingredient! @cypherNode(relationship: "INGREDIENT_OF", direction: IN)
  }

  enum RecipeLinkProblem {
    FailedIngredients
    IncompleteIngredients
    FailedImage
  }

  type RecipeLinkResult {
    recipe: Recipe
      @cypher(match: "(recipe:Recipe{id: parent.recipeId})", return: "recipe")
    problems: [RecipeLinkProblem!]!
  }

  input RecipeGetInput {
    id: ID!
  }

  extend type Query {
    recipe(input: RecipeGetInput!): Recipe
      @cypher(match: "(recipe:Recipe{id:$args.input.id})", return: "recipe")
  }

  input RecipeCreateInput {
    title: String!
    description: String
    servings: Int
    cookTime: Int
    prepTime: Int
    unattendedTime: Int
    private: Boolean
  }

  input RecipeLinkInput {
    url: String!
  }

  input RecipeCollectInput {
    recipeId: ID!
    collectionId: ID!
  }

  input RecipeUncollectInput {
    recipeId: ID!
    collectionId: ID!
  }

  input RecipeUpdateInput {
    id: ID!
    fields: RecipeUpdateFieldsInput
    coverImage: RecipeUpdateCoverImageInput
  }

  input RecipeUpdateFieldsInput {
    title: String
    description: String
    servings: Int
    cookTime: Int
    prepTime: Int
    unattendedTime: Int
    private: Boolean
    published: Boolean
  }

  input RecipeUpdateCoverImageInput {
    file: Upload
    attribution: String
  }

  input RecipeRecordViewInput {
    id: ID!
  }

  extend type Mutation {
    createRecipe(input: RecipeCreateInput!): Recipe!
      @cypher(
        match: "(user:User{id:$context.userId})"
        create: "(recipe:Recipe{id:$args.id})<-[:AUTHOR_OF]-(user)"
        setMany: [
          "recipe += $args.input"
          "recipe.displayType = 'FULL'"
          "recipe.published = false"
          "recipe.locked = false"
        ]
        return: "recipe"
      )
      @generateSlug(fromArg: "input.title")
      @authenticated

    linkRecipe(input: RecipeLinkInput!): RecipeLinkResult! @authenticated

    updateRecipe(input: RecipeUpdateInput!): Recipe
      @cypher(
        match: "(user:User{id:$context.userId})-[:AUTHOR_OF]->(recipe:Recipe{id:$args.input.id})"
        set: "recipe += $args.input.fields"
        return: "recipe"
      )
      @authenticated

    recordRecipeView(input: RecipeRecordViewInput!): Recipe
      @cypherCustom(
        statement: """
        MATCH (recipe:Recipe{id:$args.input.id})
        WITH recipe,
          CASE WHEN datetime(coalesce(recipe.viewedAt, '2018-08-31T00:00:00')) + duration("PT1M") < datetime($args.input.time)
          THEN 1 ELSE 0 END as increment
        SET recipe.views = coalesce(recipe.views, 0) + increment, recipe.viewedAt = $args.input.time
        RETURN recipe
        """
      )

    collectRecipe(input: RecipeCollectInput!): Recipe!
      @cypher(
        match: """
        (recipe:Recipe{id:$args.input.recipeId}),
          (user:User{id:$context.userId})-[:MEMBER_OF]->(group:Group)-[:HAS_COLLECTION]->
          (collection:RecipeCollection{id:$args.input.collectionId})
        """
        merge: "(recipe)-[:COLLECTED_IN]->(collection)"
        return: "recipe"
      )
      @authenticated

    uncollectRecipe(input: RecipeUncollectInput!): Recipe
      @cypher(
        match: "(recipe:Recipe{id:$args.input.recipeId})"
        optionalMatch: """
        (user:User{id:$context.userId})-[:MEMBER_OF]->(:Group)-[:HAS_COLLECTION]->
          (:RecipeCollection)<-[rel:COLLECTED_IN]-(recipe)
        """
        delete: "rel"
        return: "recipe"
      )
      @authenticated
  }
`;
