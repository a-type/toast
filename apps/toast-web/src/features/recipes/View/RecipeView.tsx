import React from 'react';
import Ingredients from './Ingredients';
import Details from './Details/Details';
import { pathOr, path } from 'ramda';
import { Redirect } from 'react-router-dom';
import { Controls } from 'components/layouts';
import { H2 } from 'components/typeset';
import ViewSpy from './ViewSpy';
import FullRecipeQuery from '../queries/FullRecipeQuery';
import { Spotlight } from 'features/recipes/components';
import { StepsLink } from './components';

export interface RecipeViewProps {
  recipeId: string;
}

export default class RecipeView extends React.Component<RecipeViewProps> {
  render() {
    const { recipeId } = this.props;

    return (
      <FullRecipeQuery variables={{ recipeId }}>
        {({ loading, data, error }) => {
          if (!loading && data && data.recipe && !data.recipe.published) {
            if (
              pathOr('none', ['recipe', 'author', 'id'], data) ===
              path(['me', 'id'], data)
            ) {
              return <Redirect to={`/recipes/edit/${recipeId}`} />;
            }
            return <Redirect to="/" />;
          }

          if (error) {
            return <div>{error.message}</div>;
          }

          const recipe = pathOr(null, ['recipe'], data);

          return (
            <React.Fragment>
              <Spotlight recipe={recipe} />
              <Details recipe={recipe} />
              <H2 name="IngredientsSection">Ingredients</H2>
              <Ingredients
                servings={path(['servings'], recipe)}
                ingredients={pathOr([], ['ingredients'], recipe)}
              />
              <Controls>
                <StepsLink recipeId={recipeId} />
              </Controls>
              <ViewSpy recipeId={recipeId} />
            </React.Fragment>
          );
        }}
      </FullRecipeQuery>
    );
  }
}
