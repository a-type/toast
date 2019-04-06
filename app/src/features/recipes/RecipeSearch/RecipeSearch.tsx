import React from 'react';
import {
  useRecipeSearch,
  RecipeSearchIngredientFilterValue,
} from 'contexts/RecipeSearchContext';
import { useEffect, useState } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import useDebounce from 'hooks/useDebounce';
import gql from 'graphql-tag';
import { Box, Heading, Paragraph } from 'grommet';
import { Icon } from 'components/generic';
import { RecipeSearchForm } from './RecipeSearchForm';
import RecipeCards, { RecipeCardsSkeleton } from '../RecipeCards/RecipeCards';

const SearchRecipesQuery = gql`
  query SearchRecipes($term: String, $include: [ID!], $exclude: [ID!]) {
    searchRecipes(
      input: {
        term: $term
        ingredients: { include: $include, exclude: $exclude }
      }
    ) {
      id
      title
      coverImage {
        id
        url
        attribution
      }
    }
  }
`;

const useRecipeResults = (
  term: string,
  includeIngredients: RecipeSearchIngredientFilterValue[],
  excludeIngredients: RecipeSearchIngredientFilterValue[],
) => {
  const debouncedTerm = useDebounce(term);
  const client = useApolloClient();
  const [queryResult, setQueryResult] = useState(null);

  useEffect(() => {
    if (
      debouncedTerm ||
      includeIngredients.length ||
      excludeIngredients.length
    ) {
      client
        .query({
          query: SearchRecipesQuery,
          variables: {
            term: debouncedTerm,
            includeIngredients,
            excludeIngredients,
          },
        })
        .then(setQueryResult);
    }
  }, [term, includeIngredients, excludeIngredients]);

  return queryResult;
};

export const RecipeSearchResults = ({ data, loading, error }) => {
  if (loading) {
    return <RecipeCardsSkeleton />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data) {
    return null;
  }

  return <RecipeCards recipes={data.searchRecipes} />;
};

export const RecipeSearch = () => {
  const search = useRecipeSearch();
  const result = useRecipeResults(
    search.searchTerm,
    search.includeIngredients,
    search.excludeIngredients,
  );

  return (
    <>
      <RecipeSearchForm
        searchTerm={search.searchTerm}
        onSearchTermChanged={search.setSearchTerm}
        includeIngredients={search.includeIngredients}
        excludeIngredients={search.excludeIngredients}
        addIncludeIngredient={search.addIncludeIngredient}
        removeIncludeIngredient={search.removeIncludeIngredient}
        addExcludeIngredient={search.addExcludeIngredient}
        removeExcludeIngredient={search.removeExcludeIngredient}
      />
      <RecipeSearchResults {...result} />
    </>
  );
};
