import * as React from 'react';
import RecipeCard from './RecipeCard';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { withProps, compose } from 'recompose';
import { CardShape, CardGrid } from 'components/generic/Card';
import { CardSkeleton } from 'components/skeletons';

interface RecipeCardsProps {
  recipes: any[];
  onRecipeSelected?(recipe: any): void;
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
    function(recipe: any) {
      ownProps.history.push(`/recipes/${recipe.id}`);
    },
}));

export const RecipeCardsSkeleton: React.SFC<{ count?: number }> = ({
  count = 9,
}) => (
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

export const RecipeCards = compose<{}, RecipeCardsProps>(
  withRouter,
  withDefaultSelectBehavior,
)(Grid);

export default RecipeCards;
