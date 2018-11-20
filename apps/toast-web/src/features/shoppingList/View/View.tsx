import React from 'react';
import GetShoppingListQuery from './GetShoppingListQuery';
import Ingredient from './Ingredient';
import { Content } from 'components/layouts';
import { H1, HelpText, H3 } from 'components/typeset';
import { format, getDay, setDay, addWeeks } from 'date-fns';
import { Checkbox, Disconnected } from 'components/generic';
import logger from 'logger';
import { Redirect } from 'react-router-dom';
import { path } from 'ramda';
import { ShoppingList } from 'generated/schema';

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
    <GetShoppingListQuery>
      {({ data, loading, error }) => {
        if (loading) {
          return <Skeleton />;
        }

        if (error) {
          logger.fatal(error);
          return <Disconnected />;
        }

        const shoppingList = path<ShoppingList>(['plan', 'shoppingList'], data);

        if (!shoppingList) {
          // TODO: splash screen for shopping list, then send to plan
          return <Redirect to="/plan/edit" />;
        }

        const ingredients = shoppingList.ingredients.sort(sortByName);
        const purchased = ingredients.filter(
          ing => ing.purchasedValue >= ing.totalValue,
        );
        const unpurchased = ingredients.filter(
          ing => ing.purchasedValue < ing.totalValue,
        );

        const today = new Date();
        const groceryDay = path<number>(['plan', 'groceryDay'], data);
        const groceryDate =
          getDay(today) < groceryDay
            ? setDay(today, groceryDay)
            : addWeeks(setDay(today, groceryDay), 1);

        return (
          <React.Fragment>
            <HelpText spaceBelow="lg">
              your grocery day is {format(groceryDate, 'MMMM Do, YYYY')}
            </HelpText>
            <div>
              {unpurchased.map(ing => (
                <Ingredient
                  key={ing.ingredient.id}
                  {...ing}
                  shoppingListId={shoppingList.id}
                />
              ))}
            </div>
            <H3>Purchased</H3>
            <div style={{ opacity: 0.5 }}>
              {!!purchased.length ? (
                purchased.map(ing => (
                  <Ingredient
                    key={ing.ingredient.id}
                    {...ing}
                    shoppingListId={shoppingList.id}
                  />
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
  </Content>
);

export default View;
