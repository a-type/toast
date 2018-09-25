// @flow

import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import RecipeCard from 'features/recipes/Card';
import { H1, P, H2 } from 'components/typeset';
import { Content } from 'components/layouts';
import { sentence } from 'change-case';
import ManageSection from './ManageSection';

export const Basic = gql`
  query IngredientBasic($id: ID!) {
    ingredient(id: $id) {
      id
      name
      description
      attribution
      alternateNames
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

  const {
    name,
    description,
    attribution,
    recipes,
    id,
    alternateNames,
  } = data.ingredient;

  return (
    <Content>
      <H1>{sentence(name)}</H1>
      {alternateNames.length > 0 && (
        <P>
          <i>Alternate names: {alternateNames.map(sentence).join(', ')}</i>
        </P>
      )}
      <P>{description || 'No details'}</P>
      {attribution && (
        <P>
          <i>{attribution}</i>
        </P>
      )}
      <ManageSection ingredientId={id} />
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
