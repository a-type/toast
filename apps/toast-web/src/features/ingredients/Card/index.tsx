import React from 'react';
import { Card, CardShape } from 'components/generic/Card';
import gql from 'graphql-tag';
import { Link } from 'components/generic';

const IngredientCard = ({ ingredient }) => (
  <Card shape={CardShape.Normal}>
    <Link to={`/ingredients/${ingredient}`}>{ingredient.name}</Link>
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

export default IngredientCard;
