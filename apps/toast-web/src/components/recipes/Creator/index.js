import React from 'react';
import View, { RecipeCreateViewFragment } from './View';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Loader } from 'components/generic';

const GetRecipe = gql`
  query GetRecipe($id: ID!) {
    recipe(id: $id) {
      ...RecipeCreateView
    }
  }

  ${RecipeCreateViewFragment}
`;

export default props => (
  <Query
    query={GetRecipe}
    skip={!props.recipeId}
    variables={{ id: props.recipeId }}
  >
    {result => {
      if (props.recipeId && result.loading) {
        return <Loader />;
      }
      if (result.error) {
        return <div>{result.error.message}</div>;
      }

      return <View {...props} recipe={result.data.recipe} />;
    }}
  </Query>
);
