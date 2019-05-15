import React from 'react';
import { RecipeCards } from 'features/recipes';
import { sentence } from 'change-case';
import ManageSection from './ManageSection';
import ErrorMessage from 'components/generic/ErrorMessage';
import IngredientDetailsQuery from './IngredientDetailsQuery';
import { Paragraph } from 'grommet';
import { Heading } from 'components/text';
import { HeadingSkeleton, ParagraphSkeleton } from 'components/skeletons';

export default ({ ingredientId }) => (
  <IngredientDetailsQuery variables={{ id: ingredientId }}>
    {({ data, loading, error }) => {
      if (loading) {
        return (
          <React.Fragment>
            <HeadingSkeleton />
            <ParagraphSkeleton />
          </React.Fragment>
        );
      }

      if (error) {
        return <ErrorMessage error={error} />;
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
          <Heading>{sentence(name)}</Heading>
          {alternateNames.length > 0 && (
            <Paragraph>
              <i>
                Alternate names:{' '}
                {alternateNames.map(name => sentence(name)).join(', ')}
              </i>
            </Paragraph>
          )}
          <Paragraph>{description || 'No details'}</Paragraph>
          {attribution && (
            <Paragraph>
              <i>{attribution}</i>
            </Paragraph>
          )}
          <ManageSection ingredient={data.ingredient} />
          <Heading level="2">Recipes</Heading>
          <RecipeCards recipes={recipes} />
        </React.Fragment>
      );
    }}
  </IngredientDetailsQuery>
);
