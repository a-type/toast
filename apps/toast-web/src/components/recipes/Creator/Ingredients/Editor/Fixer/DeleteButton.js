import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Button } from 'components/generic';

const DeleteIngredient = gql`
  mutation DeleteIngredient($id: ID!) {
    deleteRecipeIngredient(id: $id) {
      id
      ingredients {
        id
      }
    }
  }
`;

export default ({ ingredientId }) => (
  <Mutation mutation={DeleteIngredient} variables={{ id: ingredientId }}>
    {deleteIngredient => (
      <Button.Icon onClick={deleteIngredient} name="delete" />
    )}
  </Mutation>
);
