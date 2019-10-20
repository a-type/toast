import { useState, useCallback } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { useDebouncedCallback } from 'use-debounce';
import gql from 'graphql-tag';

export const useLazyFoodSuggestions = (
  delay: number = 250,
): [
  (term: string) => any,
  { id: string; name: string }[],
  { loading: boolean },
] => {
  const client = useApolloClient();
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<
    { id: string; name: string }[]
  >([]);

  const handleSearchTermChange = useCallback(
    async (searchTerm: string = '') => {
      if (searchTerm.length > 2) {
        setLoading(true);
        try {
          const result = await client.query<
            FoodSuggestionsQueryResult,
            FoodSuggestionsQueryVariables
          >({
            query: FoodSuggestionsQuery,
            variables: {
              searchTerm,
            },
          });

          setSuggestions(
            result.data && result.data.foods
              ? result.data.foods.edges.map(({ node }) => node)
              : [],
          );
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    },
    [client],
  );
  const [debouncedHandleSearchTermChange] = useDebouncedCallback(
    handleSearchTermChange,
    delay,
  );

  return [debouncedHandleSearchTermChange, suggestions, { loading }];
};

const FoodSuggestionsQuery = gql`
  query FoodSuggestions($searchTerm: String) {
    foods(first: 5, searchTerm: $searchTerm) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

type FoodSuggestionsQueryResult = {
  foods: {
    edges: {
      node: {
        id: string;
        name: string;
      };
    }[];
  };
};

type FoodSuggestionsQueryVariables = {
  searchTerm: string;
};
