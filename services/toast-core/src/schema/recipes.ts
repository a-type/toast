import { gql } from 'apollo-server-core';

export default gql`
  type Recipe {
    id: ID! @aqlKey

    title: String!

    """
    A bit of long- or short-form prose to describe the history of the recipe, special preparations,
    or anything else the author wants the reader to know. This is stored as a SlateJS document encoded
    as JSON.
    """
    introduction: String

    """
    A brief summary of the recipe to use in cards or user notifications
    """
    description: String

    """
    A description of the person or publication to which the recipe is credited
    """
    attribution: String

    """
    If the recipe originated on a remote site, this should be the canonical link to it
    """
    sourceUrl: String

    """
    As described in ingredients and instructions, this is how many meals the recipe
    should produce.
    """
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

    author: User @aqlNode(edgeCollection: "AuthorOf", direction: INBOUND)

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
    endCursor: String
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

  type LinkRecipeResult {
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
              FILTER candidate_authored_recipe._key == $args.input.id
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

  input CreateRecipeInput {
    fields: CreateRecipeFieldsInput!
  }

  input CreateRecipeFieldsInput {
    title: String!
    introduction: String
    description: String
    servings: Int
    cookTime: Int
    prepTime: Int
    unattendedTime: Int
    private: Boolean
  }

  type CreateRecipeResult {
    recipe: Recipe!
      @aqlNewQuery
      @aqlSubquery(query: "", return: "$parent.recipe")
  }

  input LinkRecipeInput {
    url: String!
  }

  input CollectRecipeInput {
    recipeId: ID!
    collectionId: ID!
  }

  input UncollectRecipeInput {
    recipeId: ID!
    collectionId: ID
  }

  input UpdateRecipeInput {
    id: ID!
    fields: UpdateRecipeFieldsInput = {}
    steps: UpdateRecipeStepsInput = {}
    coverImage: Upload
  }

  input UpdateRecipeFieldsInput {
    title: String
    introduction: String
    description: String
    servings: Int
    cookTime: Int
    prepTime: Int
    unattendedTime: Int
    private: Boolean
    published: Boolean
  }

  input UpdateRecipeStepsInput {
    """
    Simply assigns a list of strings as the steps of the recipe
    """
    set: [String!]
  }

  type UpdateRecipeResult {
    recipe: Recipe
      @aqlNewQuery
      @aqlSubquery(query: "", return: "$parent.recipe")
  }

  extend type Mutation {
    createRecipe(input: CreateRecipeInput!): CreateRecipeResult!
      @aqlSubquery(
        query: """
        LET user = DOCUMENT(Users, $context.userId)
        LET recipe = FIRST(
          INSERT {
            title: $args.input.fields.title,
            introduction: $args.input.fields.introduction,
            description: $args.input.fields.description,
            servings: $args.input.fields.servings,
            cookTime: $args.input.fields.cookTime,
            prepTime: $args.input.fields.prepTime,
            unattendedTime: $args.input.fields.unattendedTime,
            private: $args.input.fields.private,
            createdAt: DATE_NOW(),
            updatedAt: DATE_NOW()
          } INTO Recipes
          RETURN NEW
        )
        INSERT { _from: user._id, _to: recipe._id } INTO AuthorOf
        """
        return: "{ recipe: recipe }"
      )
      @subscribed

    linkRecipe(input: LinkRecipeInput!): LinkRecipeResult! @subscribed

    updateRecipe(input: UpdateRecipeInput!): UpdateRecipeResult!
      @aqlSubquery(
        query: """
        LET recipe = FIRST(
          FOR authored_recipe IN OUTBOUND DOCUMENT(Users, $context.userId) AuthorOf
            FILTER authored_recipe._key == $args.input.id
            LIMIT 1
            RETURN authored_recipe
        )
        UPDATE recipe._key WITH {
          updatedAt: DATE_NOW(),
          title: NOT_NULL($args.input.fields.title, recipe.title),
          introduction: NOT_NULL($args.input.fields.introduction, recipe.introduction),
          description: NOT_NULL($args.input.fields.description, recipe.description),
          servings: NOT_NULL($args.input.fields.servings, recipe.servings),
          cookTime: NOT_NULL($args.input.fields.cookTime, recipe.cookTime),
          prepTime: NOT_NULL($args.input.fields.prepTime, recipe.prepTime),
          unattendedTime: NOT_NULL($args.input.fields.unattendedTime, recipe.unattendedTime),
          private: NOT_NULL($args.input.fields.private, recipe.private),
          published: NOT_NULL($args.input.fields.published, recipe.published),
          steps: NOT_NULL($args.input.steps.set, recipe.steps)
        } IN Recipes
        """
        return: "{ recipe: NEW }"
      )
      @subscribed

    collectRecipe(input: CollectRecipeInput!): Recipe!
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
        LET collected = hasAccess ? FIRST(
          INSERT { _from: recipe._id, _to: collection._id } INTO CollectedIn
          RETURN recipe
        ) : null
        """
      )
      @subscribed

    uncollectRecipe(input: UncollectRecipeInput!): Recipe
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
      @subscribed
  }
`;
