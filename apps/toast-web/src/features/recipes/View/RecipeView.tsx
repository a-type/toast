import React from 'react';
import Ingredients from './Ingredients';
import Details from './Details/Details';
import { pathOr, path } from 'ramda';
import { Redirect } from 'react-router-dom';
import ViewSpy from './ViewSpy';
import FullRecipeQuery from '../queries/FullRecipeQuery';
import { Spotlight } from 'features/recipes/components';
import { StepsLink } from './components';
import { Heading } from 'grommet';

export interface RecipeViewProps {
  recipeId: string;
}

export default class RecipeView extends React.Component<RecipeViewProps> {
  render() {
    const { recipeId } = this.props;

    return (
      <FullRecipeQuery variables={{ recipeId }}>
        {({ loading, data, error }) => {
          if (
            !loading &&
            data &&
            data.recipe &&
            !(data.recipe as any).published
          ) {
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
              <Heading level="2">Ingredients</Heading>
              <Ingredients
                servings={path(['servings'], recipe)}
                ingredients={pathOr([], ['ingredients'], recipe)}
              />
              <StepsLink recipeId={recipeId} />
              <ViewSpy recipeId={recipeId} />
            </React.Fragment>
          );
        }}
      </FullRecipeQuery>
    );
  }
}
