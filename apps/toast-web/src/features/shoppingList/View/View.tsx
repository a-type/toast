import React from 'react';
import GetShoppingListQuery from './GetShoppingListQuery';
import GetWeekIndexQuery from 'features/plan/Calendar/GetWeekIndexQuery';
import Ingredient from './Ingredient';
import { Content } from 'components/layouts';
import { H1, HelpText, H3 } from 'components/typeset';
import { format, startOfWeek } from 'date-fns';
import { Checkbox, Disconnected } from 'components/generic';
import logger from 'logger';

const sortByName = (a, b) => a.ingredient.name.localeCompare(b.ingredient.name);

const Skeleton = () => (
  <div>
    {new Array(8).fill(null).map((_, idx) => (
      <Checkbox.Skeleton key={idx} size={12} />
    ))}
  </div>
);

const View: React.SFC<{}> = () => (
  <Content>
    <H1 spaceBelow="sm">Shopping List</H1>
    <HelpText spaceBelow="lg">
      for the week starting {format(startOfWeek(new Date()), 'MMMM Do, YYYY')}
    </HelpText>
    <GetWeekIndexQuery>
      {({ data: indexData, loading: indexLoading, error: indexError }) => {
        if (indexLoading || indexError) {
          return <Skeleton />;
        }

        return (
          <GetShoppingListQuery
            variables={{ weekIndex: indexData.planWeekIndex }}
          >
            {({ data, loading, error }) => {
              if (loading) {
                return <Skeleton />;
              }

              if (error) {
                logger.fatal(error);
                return <Disconnected />;
              }

              const ingredients = data.week.shoppingList.ingredients.sort(
                sortByName,
              );
              const purchased = ingredients.filter(
                ing => ing.purchasedValue >= ing.totalValue,
              );
              const unpurchased = ingredients.filter(
                ing => ing.purchasedValue < ing.totalValue,
              );

              return (
                <React.Fragment>
                  <div>
                    {unpurchased.map(ing => (
                      <Ingredient key={ing.ingredient.id} {...ing} />
                    ))}
                  </div>
                  <H3>Purchased</H3>
                  <div style={{ opacity: 0.5 }}>
                    {!!purchased.length ? (
                      purchased.map(ing => (
                        <Ingredient key={ing.ingredient.id} {...ing} />
                      ))
                    ) : (
                      <HelpText>
                        Check items off the list and they will move here
                      </HelpText>
                    )}
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
