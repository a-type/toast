// @flow

import React from 'react';
import styled from 'styled-components';
import { Card } from 'components/generic';
import gql from 'graphql-tag';
import { type Ingredient } from 'types';

const IngredientCard = ({ ingredient }: { ingredient: Ingredient }) => (
  <Card link={`/ingredients/${ingredient.id}`} shape="normal">
    {ingredient.name}
  </Card>
);

IngredientCard.fragments = {
  Ingredient: gql`
    fragment IngredientCard on Ingredient {
      id
      name
    }
  `,
};

IngredientCard.Grid = Card.Grid;
IngredientCard.Skeleton = Card.Skeleton;

export default IngredientCard;
