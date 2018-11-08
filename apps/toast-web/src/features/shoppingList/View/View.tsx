import React from 'react';
import GetShoppingListQuery from './GetShoppingListQuery';
import GetWeekIndexQuery from 'features/plan/Calendar/GetWeekIndexQuery';
import Ingredient from './Ingredient';
import { Content } from 'components/layouts';
import { H1, HelpText } from 'components/typeset';
import { format, startOfWeek } from 'date-fns';

const View: React.SFC<{}> = () => (
  <Content>
    <H1 spaceBelow="sm">Shopping List</H1>
    <HelpText spaceBelow="lg">
      for the week starting {format(startOfWeek(new Date()), 'MMMM Do, YYYY')}
    </HelpText>
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
                <React.Fragment>
                  <div>
                    {data.week.shoppingList.ingredients.map(ing => (
                      <Ingredient key={ing.ingredient.id} {...ing} />
                    ))}
                  </div>
                </React.Fragment>
              );
            }}
          </GetShoppingListQuery>
        );
      }}
    </GetWeekIndexQuery>
  </Content>
);

export default View;
