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
  id: string;
  title?: string;
  description?: string;
  servings?: number;
  cookTime?: number;
  prepTime?: number;
  unattendedTime?: number;
  private?: boolean;
  published?: boolean;
  steps?: string[];
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
  ingredientsConnection: {
    nodes: EditRecipeRecipeIngredient[];
  };
  steps: string[];
};

export type EditRecipeCreateIngredientInput = {
  ingredientText: string;
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
    foodStart
    foodEnd
    comments
    preparations
    food {
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
    food {
      ...EditRecipeRecipeIngredient
    }
    steps
  }

  ${EditRecipeRecipeIngredientFragment}
  ${EditRecipeRecipeStepFragment}
`;

export const CreateRecipeMutation = gql`
  mutation CreateRecipe($input: CreateRecipeInput!) {
    createRecipe(input: $input) {
      ...EditRecipeRecipe
    }
  }

  ${EditRecipeRecipeFragment}
`;

export const UpdateRecipeMutation = gql`
  mutation UpdateRecipe($input: UpdateRecipeInput!) {
    updateRecipe(input: $input) {
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
