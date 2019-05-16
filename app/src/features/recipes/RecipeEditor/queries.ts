import gql from 'graphql-tag';

export type RecipeCreateInput = {
  title: string;
  description?: string;
  servings?: number;
  cookTime?: number;
  prepTime?: number;
  unattendedTime?: number;
  private?: boolean;
};

export type RecipeUpdateInput = {
  title?: string;
  description?: string;
  servings?: number;
  cookTime?: number;
  prepTime?: number;
  unattendedTime?: number;
  private?: boolean;
};

export type EditRecipeIngredient = {
  id: string;
  name: string;
};

export type EditRecipeRecipeIngredient = {
  id: string;
  text: string;
  unit?: string;
  quantity: number;
  ingredient: EditRecipeIngredient;
  unitStart?: number;
  unitEnd?: number;
  quantityStart?: number;
  quantityEnd?: number;
  ingredientStart?: number;
  ingredientEnd?: number;
  comments: string[];
  preparations: string[];
};

export type EditRecipeRecipeStep = {
  id: string;
  index: number;
  text: string;
};

export type EditRecipeRecipe = {
  id: string;
  title: string;
  description: string;
  servings: number;
  cookTime: number;
  prepTime: number;
  unattendedTime: number;
  published: boolean;
  private: boolean;
  ingredients: EditRecipeRecipeIngredient[];
  steps: EditRecipeRecipeStep[];
};

export type EditRecipeCreateIngredientInput = {
  ingredientText: string;
};

export type EditRecipeCreateStepInput = {
  text: string;
};

export type EditRecipeUpdateStepInput = {
  recipeStepId: string;
  text?: string;
};

export const EditRecipeRecipeIngredientFragment = gql`
  fragment EditRecipeRecipeIngredient on RecipeIngredient {
    id
    text
    unit
    quantity
    unitStart
    unitEnd
    quantityStart
    quantityEnd
    ingredientStart
    ingredientEnd
    comments
    preparations
    ingredient {
      id
      name
    }
  }
`;

export const EditRecipeRecipeStepFragment = gql`
  fragment EditRecipeRecipeStep on RecipeStep {
    id
    index
    text
  }
`;

export const EditRecipeRecipeFragment = gql`
  fragment EditRecipeRecipe on Recipe {
    id
    title
    description
    servings
    cookTime
    prepTime
    unattendedTime
    published
    private
    ingredients {
      ...EditRecipeRecipeIngredient
    }
    steps {
      ...EditRecipeRecipeStep
    }
  }

  ${EditRecipeRecipeIngredientFragment}
  ${EditRecipeRecipeStepFragment}
`;

export const CreateRecipeMutation = gql`
  mutation CreateRecipe($input: RecipeCreateInput!) {
    createRecipe(input: $input) {
      ...EditRecipeRecipe
    }
  }

  ${EditRecipeRecipeFragment}
`;

export const UpdateRecipeMutation = gql`
  mutation UpdateRecipe($id: ID!, $input: RecipeUpdateInput!) {
    updateRecipe(id: $id, input: $input) {
      ...EditRecipeRecipe
    }
  }

  ${EditRecipeRecipeFragment}
`;

export const GetRecipeQuery = gql`
  query EditGetRecipe($id: ID!) {
    recipe(id: $id) {
      ...EditRecipeRecipe
    }
  }

  ${EditRecipeRecipeFragment}
`;

export const CreateRecipeIngredientMutation = gql`
  mutation CreateRecipeIngredient($recipeId: ID!, $ingredientText: String!) {
    createRecipeIngredient(
      recipeId: $recipeId
      input: { text: $ingredientText }
    ) {
      id
      ...EditRecipeRecipeIngredient
    }
  }

  ${EditRecipeRecipeIngredientFragment}
`;

export const CreateRecipeStepMutation = gql`
  mutation CreateRecipeStep($recipeId: ID!, $input: RecipeStepCreateInput!) {
    createRecipeStep(recipeId: $recipeId, input: $input) {
      id
      ...EditRecipeRecipeStep
    }
  }

  ${EditRecipeRecipeStepFragment}
`;

export const UpdateRecipeStepMutation = gql`
  mutation UpdateRecipeStep($input: RecipeStepUpdateInput!) {
    updateRecipeStep(input: $input) {
      id
      ...EditRecipeRecipeStep
    }
  }

  ${EditRecipeRecipeStepFragment}
`;

export const DeleteRecipeStepMutation = gql`
  mutation DeleteRecipeStep($recipeStepId: ID!) {
    deleteRecipeStep(id: $recipeStepId) {
      id
      ...EditRecipeRecipeStep
    }
  }

  ${EditRecipeRecipeStepFragment}
`;

export const PublishRecipeMutation = gql`
  mutation PublishRecipe($recipeId: ID!) {
    publishRecipe(id: $recipeId) {
      id
      ...EditRecipeRecipe
    }
  }

  ${EditRecipeRecipeFragment}
`;
