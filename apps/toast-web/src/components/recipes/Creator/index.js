import React from 'react';
import View, { RecipeCreateViewFragment } from './View';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Loader } from 'components/generic';
import { Redirect } from 'react-router-dom';

const GetRecipeForEditing = gql`
  query GetRecipeForEditing($id: ID!) {
    recipe(id: $id) {
      ...RecipeCreateView
      author {
        id
      }
    }

    me {
      id
    }
  }

  ${RecipeCreateViewFragment}
`;

export default props => (
  <Query
    query={GetRecipeForEditing}
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

      if (!result.data.recipe) {
        return <View {...props} />;
      }

      if (result.data.recipe.author.id !== result.data.me.id) {
        return <Redirect to={`/recipes/${props.recipeId}`} />;
      }

      return <View {...props} recipe={result.data.recipe} />;
    }}
  </Query>
);
