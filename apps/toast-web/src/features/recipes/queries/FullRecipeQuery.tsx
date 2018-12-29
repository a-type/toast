import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import gql from 'graphql-tag';
import { FullRecipe } from 'generated/schema';
import Details from 'features/recipes/View/Details';
import { Spotlight } from 'features/recipes/components';

export const Document = gql`
  query FullRecipe($recipeId: ID!) {
    recipe(id: $recipeId) {
      id
      published
      displayType
      ingredients {
        id
        unit
        unitTextMatch
        value
        valueTextMatch
        text
        ingredientTextMatch
        index
        ingredient {
          id
          name
        }
      }
      steps {
        id
        index
        step {
          id
          text
        }
      }
      coverImage {
        id
        url
        attribution
      }

      ...RecipeDetails
      ...RecipeSpotlight
    }

    me {
      id
    }
  }

  ${Details.fragments.Recipe}
  ${Spotlight.fragments.recipe}
`;

interface FullRecipeQueryProps {
  variables?: FullRecipe.Variables;
  skip?: boolean;
  children(
    result: QueryResult<FullRecipe.Query, FullRecipe.Variables>,
  ): React.ReactNode;
}

const FullRecipeQuery: React.SFC<FullRecipeQueryProps> = props => (
  <Query<FullRecipe.Query, FullRecipe.Variables> query={Document} {...props} />
);

export default FullRecipeQuery;