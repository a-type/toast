import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { FileChooser } from 'components/generic';

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

const BulkCreator = ({ createIngredient }) => (
  <FileChooser
    onChange={file => {
      const reader = new FileReader();
      reader.onload = async ev => {
        const result = ev.target.result;
        const bulk = JSON.parse(result);
        console.info('Creating ' + bulk.length + ' ingredients');
        await Promise.all(bulk.map(createIngredient));
        alert('Done');
      };
      reader.readAsText(file);
    }}
  >
    Choose JSON File
  </FileChooser>
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
