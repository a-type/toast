import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { FileInput } from 'components/generic';

const CreateIngredient = gql`
  mutation BulkCreateIngredient($input: IngredientCreateInput!) {
    createIngredient(input: $input) {
      id
      name
      description
      attribution
    }
  }
`;

export interface IngredientBulkCreatorProps {
  createIngredient(params: {
    variables: {
      input: any; // FIXME
    };
  }): Promise<any>;
}

const BulkCreator: React.SFC<IngredientBulkCreatorProps> = ({
  createIngredient,
}) => (
  <FileInput
    onChange={file => {
      const reader = new FileReader();
      reader.onload = async ev => {
        const result = (ev.target as any).result;
        const bulk = JSON.parse(result);
        await Promise.all(bulk.map(createIngredient));
        alert('Done');
      };
      reader.readAsText(file);
    }}
    label="Choose JSON File"
  />
);

export default () => (
  <Mutation mutation={CreateIngredient}>
    {createIngredient => (
      <BulkCreator
        createIngredient={ingredient =>
          createIngredient({ variables: { input: ingredient } })
        }
      />
    )}
  </Mutation>
);
