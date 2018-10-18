import React from 'react';
import { Card } from 'components/generic';
import gql from 'fraql';
import { path } from 'ramda';
import styled from 'styled-components';
import { LikeButton } from 'features/recipes';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  & > *:not(:last-child) {
    flex: 1;
  }
`;

const getClassName = recipe => {
  if (recipe.coverImage) {
    return 'large';
  }

  if (recipe.title.length > 32) {
    return 'wide';
  }

  return 'normal';
};

const RecipeCard = ({ recipe }) => (
  <Card
    link={`/recipes/${recipe.id}`}
    imageSrc={path(['coverImage', 'url'], recipe)}
    shape={getClassName(recipe)}
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
      ${LikeButton.fragments.recipe}
    }
  `,
};

RecipeCard.Grid = Card.Grid;
RecipeCard.Skeleton = Card.Skeleton;

export default RecipeCard;
