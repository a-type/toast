// @flow

import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import RecipeCard from 'features/recipes/Card';
import { H1, P, H2 } from 'components/typeset';
import { Content } from 'components/layouts';
import { sentence } from 'change-case';

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
  if (loading) return <Content>Loading</Content>;
  if (error) return <Content>Error</Content>;

  const { name, description, attribution, recipes } = data.ingredient;

  return (
    <Content>
      <H1>{sentence(name)}</H1>
      <P>{description || 'No details'}</P>
      {attribution && (
        <P>
          <i>{attribution}</i>
        </P>
      )}
      <H2>Recipes</H2>
      <RecipeCard.Grid>
        {recipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
      </RecipeCard.Grid>
    </Content>
  );
};

export default ({ ingredientId }) => (
  <Query query={Basic} variables={{ id: ingredientId }}>
    {renderView}
  </Query>
);
