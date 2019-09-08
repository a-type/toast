import gql from 'graphql-tag';
import { subDays, addDays, parse } from 'date-fns';
import { useQuery } from '@apollo/react-hooks';
import { pathOr } from 'ramda';

export const GetShoppingListQuery = gql`
  query GetShoppingListQuery($dateAfter: Date!, $dateBefore: Date!) {
    viewer {
      id
      group {
        id
        planMealsConnection(
          filter: { dateAfter: $dateAfter, dateBefore: $dateBefore }
          first: 100
        ) {
          edges {
            node {
              id
              date
              servings
              cooking {
                id
                servings
                ingredientsConnection {
                  edges {
                    node {
                      id
                      text
                      quantity
                      quantityStart
                      quantityEnd
                      unit
                      food {
                        id
                        name
                        category
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export type GetShoppingListResult = {
  viewer: {
    id: string;
    group: {
      id: string;
      planMealsConnection: {
        edges: {
          node: ShoppingListMeal;
        }[];
      };
    };
  };
};

type ShoppingListMeal = {
  id: string;
  date: string;
  cooking: {
    id: string;
    ingredientsConnection: {
      edges: {
        node: ShoppingListIngredient;
      }[];
    };
  };
};

type GetShoppingListVariables = {
  dateBefore: number;
  dateAfter: number;
};

export type ShoppingListIngredient = {
  id: string;
  text: string;
  quantity: number;
  quantityStart: number;
  quantityEnd: number;
  unit: string;
  food: {
    id: string;
    name: string;
    category: string;
  };
};

export type ShoppingListItem = {
  key: string;
  mealDate: Date;
  ingredient: ShoppingListIngredient;
  quantityMultiplier: number;
};

export const useShoppingList = ({
  fromDate,
  dayCount = 7,
}: {
  fromDate: Date;
  dayCount?: number;
}) => {
  const dateAfter = subDays(fromDate, 1);
  const dateBefore = addDays(fromDate, dayCount);

  const { data, ...rest } = useQuery<
    GetShoppingListResult,
    GetShoppingListVariables
  >(GetShoppingListQuery, {
    variables: {
      dateAfter: dateAfter.getTime(),
      dateBefore: dateBefore.getTime(),
    },
  });

  const meals = pathOr(
    [],
    ['viewer', 'group', 'planMealsConnection', 'edges'],
    data,
  ) as { node: ShoppingListMeal }[];

  const items: ShoppingListItem[] = meals.reduce<ShoppingListItem[]>(
    (items, mealEdge) => [
      ...items,
      ...pathOr(
        [],
        ['node', 'cooking', 'ingredientsConnection', 'edges'],
        mealEdge,
      ).map(edge => {
        const naturalServings = pathOr(
          1,
          ['node', 'cooking', 'servings'],
          mealEdge,
        );
        const cookedServings = pathOr(1, ['node', 'servings'], mealEdge);

        return {
          key: `${parse(mealEdge.node.date).getTime()}_${edge.node.id}`,
          mealDate: parse(mealEdge.node.date),
          ingredient: edge.node as ShoppingListIngredient,
          quantityMultiplier: cookedServings / naturalServings,
        };
      }),
    ],
    [],
  );

  return {
    data: items,
    ...rest,
  };
};
