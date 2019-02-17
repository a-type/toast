import React from 'react';
import GetShoppingListQuery from './GetShoppingListQuery';
import Ingredient from './Ingredient';
import { HelpText } from 'components/text';
import { Heading } from 'grommet';
import { format, getDay, setDay, addWeeks } from 'date-fns';
import { Disconnected } from 'components/generic';
import logger from 'logger';
import { Redirect } from 'react-router-dom';
import { path } from 'ramda';
import { ShoppingList } from 'generated/schema';
import { TextSkeleton } from 'components/skeletons';

const sortByName = (a, b) => a.ingredient.name.localeCompare(b.ingredient.name);

const Skeleton = () => (
  <div>
    {new Array(8).fill(null).map((_, idx) => (
      <TextSkeleton key={idx} size={12} />
    ))}
  </div>
);

const View: React.SFC<{}> = () => (
  <React.Fragment>
    <Heading margin={{ bottom: 'small' }}>Shopping List</Heading>
    <GetShoppingListQuery options={{ fetchPolicy: 'no-cache' }}>
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
            <Heading level="3">Purchased</Heading>
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
  </React.Fragment>
);

export default View;
