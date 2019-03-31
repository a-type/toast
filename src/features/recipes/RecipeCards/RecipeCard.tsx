import React, { FC } from 'react';
import { Card, CardShape } from 'components/generic/Card';
import { path } from 'ramda';
import styled from 'styled-components';

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

export interface RecipeCardRecipe {
  id: string;
  title: string;
  coverImage?: {
    id: string;
    url: string;
  };
}

const RecipeCard: FC<{
  recipe: RecipeCardRecipe;
  onClick?: (ev: any) => void;
}> = ({ recipe, onClick }) => (
  <Card
    imageSrc={path(['coverImage', 'url'], recipe)}
    shape={getShape(recipe)}
    onClick={onClick}
  >
    <Row>
      <span>{recipe.title}</span>
    </Row>
  </Card>
);

export default RecipeCard;
