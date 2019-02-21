import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import gql from 'graphql-tag';
import { RecipeSuggestions } from 'generated/schema';
import { RecipeCards } from 'features/recipes';

export const Document = gql`
  query RecipeSuggestions {
    me {
      id
      recipes {
        ...RecipeCard
      }
      discoveredRecipes {
        ...RecipeCard
      }
      likedRecipes {
        ...RecipeCard
      }
    }
  }

  ${RecipeCards.fragments.recipe}
`;

interface RecipeSuggestionsQueryProps {
  variables?: RecipeSuggestions.Variables;
  skip?: boolean;
  children(
    result: QueryResult<RecipeSuggestions.Query, RecipeSuggestions.Variables>,
  ): React.ReactNode;
}

const RecipeSuggestionsQuery: React.SFC<
  RecipeSuggestionsQueryProps
> = props => (
  <Query<RecipeSuggestions.Query, RecipeSuggestions.Variables>
    query={Document}
    {...props}
  />
);

export default RecipeSuggestionsQuery;
