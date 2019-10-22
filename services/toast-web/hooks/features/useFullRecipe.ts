import gql from 'graphql-tag';
import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import { FullRecipeFragment, FullRecipe } from './fragments';
import { useMemo } from 'react';
import { pathOr } from 'ramda';

export const FullRecipeQuery = gql`
  query FullRecipe($recipeId: ID!) {
    recipe(input: { id: $recipeId }) {
      id
      ...FullRecipeFragment
    }
  }

  ${FullRecipeFragment}
`;

export type FullRecipeQueryResult = {
  recipe: FullRecipe;
};

export default (id: string, options: QueryHookOptions = {}) => {
  const { data, ...rest } = useQuery<
    FullRecipeQueryResult,
    { recipeId: string }
  >(FullRecipeQuery, {
    ...options,
    variables: {
      recipeId: id,
    },
  });

  const dataWithSortedSteps = useMemo(() => {
    if (!data) return data;

    const stepOrder = pathOr([], ['recipe', 'stepOrder'], data) as string[];
    if (stepOrder.length === 0) {
      return data;
    }

    return {
      ...data,
      recipe: {
        ...data.recipe,
        stepsConnection: {
          ...data.recipe.stepsConnection,
          edges: data.recipe.stepsConnection.edges.sort((a, b) => {
            const aOrder = stepOrder.indexOf(a.node.id);
            const bOrder = stepOrder.indexOf(b.node.id);
            return aOrder - bOrder;
          }),
        },
      },
    };
  }, [data]);

  return {
    data: dataWithSortedSteps,
    ...rest,
  };
};
