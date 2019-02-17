import React from 'react';
import { Card, CardShape } from 'components/generic/Card';
import gql from 'graphql-tag';
import { path } from 'ramda';
import styled from 'styled-components';
import LikeButton from 'features/recipes/LikeButton';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  & > *:not(:last-child) {
    flex: 1;
  }
`;

const getShape = recipe => {
  if (recipe.coverImage) {
    return CardShape.Large;
  }

  if (recipe.title.length > 32) {
    return CardShape.Wide;
  }

  return CardShape.Normal;
};

const RecipeCard = ({ recipe, onClick }) => (
  <Card
    imageSrc={path(['coverImage', 'url'], recipe)}
    shape={getShape(recipe)}
    onClick={onClick}
  >
    <Row>
      <span>{recipe.title}</span>
      <LikeButton recipe={recipe} />
    </Row>
  </Card>
);

RecipeCard.fragments = {
  recipe: gql`
    fragment RecipeCard on Recipe {
      id
      title
      coverImage {
        id
        url
      }
      ...LikeButton
    }

    ${LikeButton.fragments.recipe}
  `,
};

export default RecipeCard;
