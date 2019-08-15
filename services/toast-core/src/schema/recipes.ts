import { gql } from 'apollo-server-core';

export default gql`
  type Recipe {
    id: ID! @aqlKey
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
    views: Int! @defaultValue(value: 0)

    published: Boolean! @defaultValue(value: false)
    private: Boolean! @defaultValue(value: true)
    locked: Boolean! @defaultValue(value: true)

    steps: [String!]

    ingredientsConnection(
      first: Int = 50
      after: String = "0"
    ): RecipeIngredientConnection!
      @aqlRelayConnection(
        edgeCollection: "IngredientOf"
        edgeDirection: INBOUND
      )

    containedInViewerCollections: [RecipeCollection!]!
      @aqlSubquery(
        query: """
        LET collections = FLATTEN(
          FOR user_group IN OUTBOUND DOCUMENT(Users, $context.userId) MemberOf
            RETURN FLATTEN(FOR group_collection IN OUTBOUND user_group HasRecipeCollection
              RETURN FLATTEN(FOR group_collection_recipe IN INBOUND group_collection CollectedIn
                FILTER group_collection_recipe._key == $parent._key
                RETURN group_collection
              )
            )
        )
        """
        return: "collections"
      )
      @authenticated
  }

  type RecipeIngredientConnection {
    edges: [RecipeIngredientEdge!]! @aqlRelayEdges
    pageInfo: RecipeIngredientPageInfo! @aqlRelayPageInfo
  }

  type RecipeIngredientEdge {
    cursor: String!
    node: Ingredient! @aqlRelayNode
  }

  type RecipeIngredientPageInfo {
    hasNextPage: Boolean!
  }

  type RecipeCollection {
    id: ID! @aqlKey
    name: String!
    default: Boolean!
    createdAt: Date!

    recipesConnection(
      first: Int = 10
      after: String
    ): RecipeCollectionRecipesConnection!
      @aqlRelayConnection(
        edgeCollection: "CollectedIn"
        edgeDirection: INBOUND
        cursorExpression: "$node.createdAt"
      )
  }

  type RecipeCollectionRecipesConnection {
    edges: [RecipeCollectionRecipesEdge!]! @aqlRelayEdges
    pageInfo: RecipeCollectionRecipesPageInfo! @aqlRelayPageInfo
  }

  type RecipeCollectionRecipesEdge {
    cursor: String!
    node: Recipe! @aqlRelayNode
  }

  type RecipeCollectionRecipesPageInfo {
    hasNextPage: Boolean!
  }

  type RecipeIngredientsConnection {
    edges: [RecipeIngredientsEdge!]! @aqlRelayEdges
    pageInfo: RecipeIngredientsPageInfo! @aqlRelayPageInfo
  }

  type RecipeIngredientsEdge {
    cursor: String!
    node: Ingredient! @aqlRelayNode
  }

  type RecipeIngredientsPageInfo {
    hasNextPage: Boolean!
  }

  enum RecipeLinkProblem {
    FailedIngredients
    IncompleteIngredients
    FailedImage
  }

  type RecipeLinkResult {
    recipe: Recipe @aqlDocument(collection: "Recipes", key: "$parent.recipeId")
    problems: [RecipeLinkProblem!]!
  }

  input RecipeGetInput {
    id: ID!
  }

  extend type Query {
    recipe(input: RecipeGetInput!): Recipe
      @aqlSubquery(
        query: """
        LET recipe_candidate = DOCUMENT(Recipes, $args.input.id)
        LET $field = recipe_candidate.public && recipe_candidate.published ? recipe_candidate : FIRST(
          LET user = DOCUMENT(Users, $context.userId)
          LET authored_recipe = FIRST(
            FOR candidate_authored_recipe IN OUTBOUND user AuthorOf
              LIMIT 1
              RETURN candidate_authored_recipe
          )
          RETURN authored_recipe ? : FIRST(
            LET group = FIRST(
              FOR user_group IN OUTBOUND user MemberOf
                LIMIT 1
                RETURN user_group
            )
            RETURN FIRST(
              FOR collection IN OUTBOUND group HasRecipeCollection
                RETURN FIRST(
                  FOR candidate_collected_recipe IN INBOUND collection CollectedIn
                    FILTER candidate_collected_recipe._key == $args.input.id
                    LIMIT 1
                    RETURN candidate_collected_recipe
                )
            )
          )
        )
        """
      )
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
    collectionId: ID
  }

  input RecipeUpdateInput {
    id: ID!
    fields: RecipeUpdateFieldsInput = {}
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

  input RecipeRecordViewInput {
    id: ID!
  }

  extend type Mutation {
    createRecipe(input: RecipeCreateInput!): Recipe!
      @aqlSubquery(
        query: """
        LET user = DOCUMENT(Users, $context.userId)
        LET recipe = (
          INSERT {
            title: $args.input.title,
            description: $args.input.description,
            servings: $args.input.servings,
            cookTime: $args.input.cookTime,
            prepTime: $args.input.prepTime,
            unattendedTime: $args.input.unattendedTime,
            private: $args.input.private,
          } INTO Recipes
          RETURN NEW
        )
        INSERT { _from: user, _to: recipe } INTO AuthorOf
        """
        return: "recipe"
      )
      @authenticated

    linkRecipe(input: RecipeLinkInput!): RecipeLinkResult! @authenticated

    updateRecipe(input: RecipeUpdateInput!): Recipe
      @aqlSubquery(
        query: """
        LET recipe = FIRST(
          FOR authored_recipe IN OUTBOUND user AuthorOf
            FILTER authored_recipe._key == $args.input.id
            LIMIT 1
            RETURN authored_recipe
        )
        UPDATE recipe WITH {
          title: NON_NULL($args.input.fields.title, recipe.title),
          description: NON_NULL($args.input.fields.description, recipe.description),
          servings: NON_NULL($args.input.fields.servings, recipe.servings),
          cookTime: NON_NULL($args.input.fields.cookTime, recipe.cookTime),
          prepTime: NON_NULL($args.input.fields.prepTime, recipe.prepTime),
          unattendedTime: NON_NULL($args.input.fields.unattendedTime, recipe.unattendedTime),
          private: NON_NULL($args.input.fields.private, recipe.private),
          published: NON_NULL($args.input.fields.published, recipe.published)
        } IN RECIPES
        """
        return: "NEW"
      )
      @authenticated

    collectRecipe(input: RecipeCollectInput!): Recipe!
      @aqlSubquery(
        query: """
        LET recipe = DOCUMENT(Recipes, $args.input.recipeId)
        LET collection = DOCUMENT(RecipeCollections, $args.input.collectionId)
        LET hasAccess = FIRST(
          LET user = DOCUMENT(Users, $context.userId)
          FOR group IN OUTBOUND 1..1 user MemberOf
            LIMIT 1
            RETURN FIRST(
              FOR groupCollection IN OUTBOUND 1..1 group HasRecipeCollection
                PRUNE groupCollection._key == collection._key
                LIMIT 1
                RETURN groupCollection
            )
        ) != null
        LET $field = hasAccess ? FIRST(
          INSERT { _from: recipe._id, _to: collection._id } INTO CollectedIn
          RETURN recipe
        ) : null
        """
      )
      @authenticated

    uncollectRecipe(input: RecipeUncollectInput!): Recipe
      @aqlSubquery(
        query: """
        LET recipe = DOCUMENT(Recipes, $args.input.recipeId)
        LET collection = DOCUMENT(RecipeCollections, $args.input.collectionId)
        LET hasAccess = FIRST(
          LET user = DOCUMENT(Users, $context.userId)
          FOR group IN OUTBOUND 1..1 user MemberOf
            LIMIT 1
            RETURN FIRST(
              FOR groupCollection IN OUTBOUND 1..1 group HasRecipeCollection
                PRUNE groupCollection._key == collection._key
                LIMIT 1
                RETURN groupCollection
            )
        ) != null
        LET $field = hasAccess ? FIRST(
          LET edge = FIRST(
            FOR n, e IN INBOUND collection CollectedIn
              PRUNE n._key == recipe._key
              RETURN e
          )
          REMOVE edge FROM CollectedIn
          RETURN recipe
        ) : null
        """
      )
      @authenticated
  }
`;
