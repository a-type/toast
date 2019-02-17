import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Icon } from 'components/generic';
import { Button } from 'grommet';

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

export default ({ ingredientId }: { ingredientId: string }) => (
  <Mutation mutation={DeleteIngredient} variables={{ id: ingredientId }}>
    {deleteIngredient => (
      <Button
        icon={<Icon name="delete-button" />}
        onClick={() => deleteIngredient()}
      />
    )}
  </Mutation>
);
