// @flow

import React from 'react';
import { Query } from 'react-apollo';
import { Basic } from 'queries/Ingredients';

const renderSummary = ({ data, loading, error }) => {
  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      <h2>{data.ingredient.name}</h2>
      <p>{data.ingredient.description || 'No details'}</p>
    </div>
  );
};

export default ({ ingredientName, ingredientId }) => (
  <Query query={Basic} variables={{ name: ingredientName, id: ingredientId }}>
    {renderSummary}
  </Query>
);
