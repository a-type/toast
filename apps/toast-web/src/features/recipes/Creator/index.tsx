import React from 'react';
import View, { RecipeCreateViewFragment } from './View';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { path } from 'ramda';
import { Gate } from 'features/auth/gates';

const GetRecipeForEditing = gql`
  query GetRecipeForEditing($id: ID!) {
    recipe(id: $id) {
      ...RecipeCreateView
      author {
        id
      }
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

      return (
        <Gate
          condition={({ user, token }) =>
            user.uid === authorId || token.claims.admin
          }
          fallback={<Redirect to={`/recipes/${props.recipeId}`} />}
        >
          <View
            loading={result.loading && props.recipeId}
            {...props}
            recipe={path(['data', 'recipe'], result)}
          />
        </Gate>
      );
    }}
  </Query>
);
