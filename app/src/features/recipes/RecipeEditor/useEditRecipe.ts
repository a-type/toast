import gql from 'graphql-tag';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { useCallback, useState } from 'react';
import { ApolloError } from 'apollo-boost';
import useRouter from 'use-react-router';

export type RecipeCreateInput = {
  title: string;
  description?: string;
  servings?: number;
  cookTime?: number;
  prepTime?: number;
  unattendedTime?: number;
};

export type RecipeUpdateInput = {
  title?: string;
  description?: string;
  servings?: number;
  cookTime?: number;
  prepTime?: number;
  unattendedTime?: number;
};

export type EditRecipeIngredient = {
  id: string;
  name: string;
};

export type EditRecipeRecipeIngredient = {
  id: string;
  text: string;
  unit?: string;
  quantity?: number;
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
  ingredients: EditRecipeRecipeIngredient[];
};

export type EditRecipeCreateIngredientInput = {
  ingredientText: string;
};

const EditRecipeRecipeIngredientFragment = gql`
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

const EditRecipeRecipeFragment = gql`
  fragment EditRecipeRecipe on Recipe {
    id
    title
    description
    servings
    cookTime
    prepTime
    unattendedTime
    published
    ingredients {
      ...EditRecipeRecipeIngredient
    }
  }

  ${EditRecipeRecipeIngredientFragment}
`;

const CreateRecipeMutation = gql`
  mutation CreateRecipe($input: RecipeCreateInput!) {
    createRecipe(input: $input) {
      ...EditRecipeRecipe
    }
  }

  ${EditRecipeRecipeFragment}
`;

const UpdateRecipeMutation = gql`
  mutation UpdateRecipe($id: ID!, $input: RecipeUpdateInput!) {
    updateRecipe(id: $id, input: $input) {
      ...EditRecipeRecipe
    }
  }

  ${EditRecipeRecipeFragment}
`;

const GetRecipeQuery = gql`
  query EditGetRecipe($id: ID!) {
    recipe(id: $id) {
      ...EditRecipeRecipe
    }
  }

  ${EditRecipeRecipeFragment}
`;

const CreateRecipeIngredientMutation = gql`
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

export default ({ recipeId }: { recipeId?: string }) => {
  const isCreate = !recipeId;
  const SaveMutation = isCreate ? CreateRecipeMutation : UpdateRecipeMutation;

  const { data, loading, error } = useQuery<{ recipe: EditRecipeRecipe }>(
    GetRecipeQuery,
    {
      variables: { id: recipeId },
      skip: isCreate,
    },
  );

  const saveMutate = useMutation(SaveMutation);

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<ApolloError>(null);
  const { history } = useRouter();
  const save = useCallback(
    async ({ id, published, ...values }: EditRecipeRecipe) => {
      setSaving(true);
      try {
        const result = await saveMutate({
          variables: {
            id: recipeId,
            input: values,
          },
        });
        if (result.data.createRecipe) {
          history.push(`/recipes/${result.data.createRecipe.id}/edit`);
        }
      } catch (err) {
        setSaveError(err);
      } finally {
        setSaving(false);
      }
    },
    [saveMutate],
  );

  const createIngredientMutate = useMutation(CreateRecipeIngredientMutation);
  const createIngredient = useCallback(
    async ({ ingredientText }: EditRecipeCreateIngredientInput) => {
      setSaving(true);
      try {
        await createIngredientMutate({
          variables: {
            recipeId,
            ingredientText,
          },
          update: async (cache, { data }) => {
            const { recipe } = cache.readQuery<{ recipe: EditRecipeRecipe }>({
              query: GetRecipeQuery,
              variables: { id: recipeId },
            });
            recipe.ingredients.push(data.createRecipeIngredient);
            cache.writeQuery({ query: GetRecipeQuery, data: { recipe } });
          },
        });
      } catch (err) {
        setSaveError(err);
      } finally {
        setSaving(false);
      }
    },
    [createIngredientMutate],
  );

  return {
    recipe: (data && data.recipe) || null,
    saving,
    initializing: loading,
    error: error || saveError,
    save,
    createIngredient,
  };
};
