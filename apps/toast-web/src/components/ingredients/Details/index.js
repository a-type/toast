// @flow

import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import RecipeCard from 'components/recipes/Card';

export const Basic = gql`
  query IngredientBasic($id: ID!) {
    ingredient(id: $id) {
      id
      name
      description
      attribution
      recipes {
        ...RecipeCard
      }
    }
  }

  ${RecipeCard.fragments.Recipe}
`;

const renderView = ({ data, loading, error }) => {
  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  const { name, description, attribution, recipes } = data.ingredient;

  return (
    <div>
      <h2>{name}</h2>
      <p>{description || 'No details'}</p>
      {attribution && <i>{attribution}</i>}
      <h3>Recipes</h3>
      <RecipeCard.Grid>
        {recipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
      </RecipeCard.Grid>
    </div>
  );
};

export default ({ ingredientId }) => (
  <Query query={Basic} variables={{ id: ingredientId }}>
    {renderView}
  </Query>
);