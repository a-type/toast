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

export type EditRecipeRecipe = {
  id: string;
  title: string;
  description: string;
  servings: number;
  cookTime: number;
  prepTime: number;
  unattendedTime: number;
  published: boolean;
};

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
  }
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

export default ({
  recipeId,
}: {
  recipeId?: string;
}): {
  recipe: EditRecipeRecipe;
  initializing: boolean;
  saving: boolean;
  error: ApolloError;
  save: (values: EditRecipeRecipe) => Promise<void>;
} => {
  const isCreate = !recipeId;
  const Mutation = isCreate ? CreateRecipeMutation : UpdateRecipeMutation;

  const { data, loading, error } = useQuery<{ recipe: EditRecipeRecipe }>(
    GetRecipeQuery,
    {
      variables: { id: recipeId },
      skip: isCreate,
    },
  );

  const mutate = useMutation(Mutation);

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<ApolloError>(null);
  const { history } = useRouter();
  const save = useCallback(
    async ({ id, published, ...values }: EditRecipeRecipe) => {
      setSaving(true);
      try {
        const result = await mutate({
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
    [mutate],
  );

  return {
    recipe: (data && data.recipe) || null,
    saving,
    initializing: loading,
    error: error || saveError,
    save,
  };
};
