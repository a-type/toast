import React from 'react';
import { RecipeCards } from 'features/recipes';
import { H1, P, H2, Span } from 'components/typeset';
import { sentence } from 'change-case';
import ManageSection from './ManageSection';
import { Disconnected } from 'components/generic';
import IngredientDetailsQuery from './IngredientDetailsQuery';

export default ({ ingredientId }) => (
  <IngredientDetailsQuery variables={{ id: ingredientId }}>
    {({ data, loading, error }) => {
      if (loading) {
        return (
          <React.Fragment>
            <H1>
              <Span.Skeleton />
            </H1>
            <P.Skeleton />
          </React.Fragment>
        );
      }

      if (error) {
        return <Disconnected />;
      }

      const {
        name,
        description,
        attribution,
        recipes,
        alternateNames,
      } = data.ingredient;

      return (
        <React.Fragment>
          <H1>{sentence(name)}</H1>
          {alternateNames.length > 0 && (
            <P>
              <i>
                Alternate names:{' '}
                {alternateNames.map(name => sentence(name)).join(', ')}
              </i>
            </P>
          )}
          <P>{description || 'No details'}</P>
          {attribution && (
            <P>
              <i>{attribution}</i>
            </P>
          )}
          <ManageSection ingredient={data.ingredient} />
          <H2>Recipes</H2>
          <RecipeCards recipes={recipes} />
        </React.Fragment>
      );
    }}
  </IngredientDetailsQuery>
);
