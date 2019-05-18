import React from 'react';
import {
  useRecipeSearch,
  RecipeSearchIngredientFilterValue,
} from 'contexts/RecipeSearchContext';
import { useEffect, useState } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import { useDebounce } from 'use-debounce';
import gql from 'graphql-tag';
import { CardGrid } from 'components/generic';
import { RecipeSearchForm } from './RecipeSearchForm';
import RecipeCard from '../RecipeCards/RecipeCard';
import { QueryResult } from 'react-apollo';
import useReactRouter from 'use-react-router';
import { CardSkeleton } from 'components/skeletons';
import SaveButton from 'features/recipes/SaveButton/SaveButton';
import ErrorMessage from 'components/generic/ErrorMessage';

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
      attribution
      coverImage {
        id
        url
        attribution
      }
    }
  }
`;

type SearchRecipesQueryResult = {
  searchRecipes: {
    id: string;
    title: string;
    attribution: string;
    coverImage?: {
      id: string;
      url: string;
      attribution: string;
    };
  }[];
};

const useRecipeResults = (
  term: string,
  includeIngredients: RecipeSearchIngredientFilterValue[],
  excludeIngredients: RecipeSearchIngredientFilterValue[],
): [QueryResult<SearchRecipesQueryResult>, boolean] => {
  const [debouncedTerm] = useDebounce(term, 500);
  const client = useApolloClient();
  const [loading, setLoading] = useState(false);
  const [queryResult, setQueryResult] = useState(null);

  useEffect(() => {
    if (
      debouncedTerm ||
      includeIngredients.length ||
      excludeIngredients.length
    ) {
      setLoading(true);

      client
        .query({
          query: SearchRecipesQuery,
          variables: {
            term: debouncedTerm,
            includeIngredients,
            excludeIngredients,
          },
        })
        .then(setQueryResult)
        .finally(() => {
          setLoading(false);
        });
    }
  }, [debouncedTerm, includeIngredients, excludeIngredients]);

  return [queryResult, loading];
};

export const RecipeSearchResults = ({
  data,
  loading,
  error,
  refetch,
}: QueryResult<SearchRecipesQueryResult>) => {
  const { history } = useReactRouter();

  if (loading) {
    return (
      <CardGrid>
        {new Array(10).fill(null).map((_, idx) => (
          <CardSkeleton key={idx} />
        ))}
      </CardGrid>
    );
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (!data) {
    return null;
  }

  return (
    <CardGrid>
      {data.searchRecipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onClick={() => history.push(`/recipes/${recipe.id}`)}
          actions={[() => <SaveButton id={recipe.id} />]}
        />
      ))}
    </CardGrid>
  );
};

export const RecipeSearch = () => {
  const search = useRecipeSearch();
  const [result, loading] = useRecipeResults(
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
      <RecipeSearchResults {...result} loading={loading} />
    </>
  );
};
