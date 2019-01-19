import * as React from 'react';
import ListRecipeIngredientCorrectionsQuery from '../queries/ListRecipeIngredientCorrectionsQuery';

interface ManageRecipeIngredientsProps {}

const ManageRecipeIngredients: React.SFC<
  ManageRecipeIngredientsProps
> = ({}) => {
  return (
    <ListRecipeIngredientCorrectionsQuery variables={{ offset: 0 }}>
      {({ data, loading, error }) => {
        if (loading) {
          return null;
        }

        if (error) {
          return <div>{error.message}</div>;
        }

        const { recipeIngredientCorrections } = data;
        return (
          <div>
            {recipeIngredientCorrections.map(corr => (
              <div key={corr.id}>{JSON.stringify(corr)}</div>
            ))}
          </div>
        );
      }}
    </ListRecipeIngredientCorrectionsQuery>
  );
};

export default ManageRecipeIngredients;
