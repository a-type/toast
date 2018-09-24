import React from 'react';
import View, { RecipeCreateViewFragment } from './View';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Loader } from 'components/generic';
import { Redirect } from 'react-router-dom';
import { path } from 'ramda';

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
      if (result.error) {
        return <div>{result.error.message}</div>;
      }

      const authorId = path(['data', 'recipe', 'author', 'id'], result);
      const myId = path(['data', 'me', 'id'], result);

      if (authorId !== myId) {
        return <Redirect to={`/recipes/${props.recipeId}`} />;
      }

      return (
        <View
          loading={result.loading && props.recipeId}
          {...props}
          recipe={path(['data', 'recipe'], result)}
        />
      );
    }}
  </Query>
);
