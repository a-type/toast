import * as React from 'react';
import RecipeCard from './RecipeCard';
import { RecipeCard as RecipeCardTypes, Recipe } from 'generated/schema';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { withProps, compose } from 'recompose';
import { Card, CardShape, CardGrid } from 'components/generic/Card';
import { CardSkeleton } from 'components/skeletons';

interface RecipeCardsProps {
  recipes: RecipeCardTypes.Fragment[];
  onRecipeSelected?(recipe: RecipeCardTypes.Fragment): void;
}

const Grid: React.SFC<RecipeCardsProps> = ({ recipes, onRecipeSelected }) => (
  <CardGrid>
    {recipes.map(recipe => (
      <RecipeCard
        key={recipe.id}
        recipe={recipe}
        onClick={() => onRecipeSelected(recipe)}
      />
    ))}
  </CardGrid>
);

const withDefaultSelectBehavior = withProps<
  RecipeCardsProps,
  RecipeCardsProps & RouteComponentProps
>(ownProps => ({
  recipes: ownProps.recipes,
  onRecipeSelected:
    ownProps.onRecipeSelected ||
    function(recipe: Recipe) {
      ownProps.history.push(`/recipes/${recipe.id}`);
    },
}));

const Skeleton: React.SFC<{ count?: number }> = ({ count = 9 }) => (
  <CardGrid loading>
    {new Array(count).fill(null).map((_, idx) => {
      const shapeIdx = Math.floor(Math.random() * 10);
      let shape: CardShape;
      if (shapeIdx > 5) {
        shape = CardShape.Large;
      } else if (shapeIdx > 3) {
        shape = CardShape.Wide;
      } else {
        shape = CardShape.Normal;
      }
      return <CardSkeleton key={idx} shape={shape} />;
    })}
  </CardGrid>
);

interface RecipeCardsWithFragments
  extends React.ComponentClass<RecipeCardsProps> {
  Skeleton?: typeof Skeleton;
  fragments?: {
    [key: string]: any;
  };
}

const RecipeCards: RecipeCardsWithFragments = compose<{}, RecipeCardsProps>(
  withRouter,
  withDefaultSelectBehavior,
)(Grid);

RecipeCards.fragments = RecipeCard.fragments;
RecipeCards.Skeleton = Skeleton;

export default RecipeCards;
