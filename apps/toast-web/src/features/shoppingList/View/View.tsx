import React from 'react';
import GetShoppingListQuery from './GetShoppingListQuery';
import GetWeekIndexQuery from 'features/plan/Calendar/GetWeekIndexQuery';
import Ingredient from './Ingredient';

const View: React.SFC<{}> = () => (
  <GetWeekIndexQuery>
    {({ data: indexData, loading: indexLoading, error: indexError }) => {
      if (indexLoading || indexError) {
        return <div>...</div>;
      }

      return (
        <GetShoppingListQuery
          variables={{ weekIndex: indexData.planWeekIndex }}
        >
          {({ data, loading, error }) => {
            if (loading) {
              return <div>loading</div>;
            }

            if (error) {
              return <div>{error.message}</div>;
            }

            return (
              <div>
                {data.week.shoppingList.ingredients.map(ing => (
                  <Ingredient key={ing.ingredient.id} {...ing} />
                ))}
              </div>
            );
          }}
        </GetShoppingListQuery>
      );
    }}
  </GetWeekIndexQuery>
);

export default View;
