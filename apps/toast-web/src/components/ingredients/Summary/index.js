// @flow

import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

export const Basic = gql`
  query IngredientBasic($id: ID!) {
    ingredient(id: $id) {
      id
      name
      description
      attribution
    }
  }
`;

const renderSummary = ({ data, loading, error }) => {
  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  const { name, description, attribution } = data.ingredient;

  return (
    <div>
      <h2>{name}</h2>
      <p>{description || 'No details'}</p>
      {attribution && <i>{attribution}</i>}
    </div>
  );
};

export default ({ ingredientId }) => (
  <Query query={Basic} variables={{ id: ingredientId }}>
    {renderSummary}
  </Query>
);
