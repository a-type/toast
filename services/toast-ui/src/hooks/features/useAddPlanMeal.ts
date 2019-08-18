import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import {
  GetPlanQuery,
  GetPlanQueryResult,
  GroupPlanMealsEdgeFragment,
  GroupPlanMealEdge,
} from './usePlan';
import logger from 'logger';

export const AddPlanMealMutation = gql`
  mutation AddPlanMealMutation($input: AddPlanMealInput!) {
    addPlanMeal(input: $input) {
      planMealEdge {
        ...GroupPlanMealsEdgeFragment
      }
    }
  }

  ${GroupPlanMealsEdgeFragment}
`;

export type AddPlanMealInput = {
  date: number;
  mealName: string;
  recipeId?: string;
  servings?: number;
  note?: string;
};

export type AddPlanMealResult = {
  addPlanMeal: {
    planMealEdge: {
      cursor: string;
      node: AddPlanMealPlanMeal;
    };
  };
};

export type AddPlanMealPlanMeal = {
  id: string;
  date: number;
  mealName: string;
  note: string | null;
  servings: number | null;
};

const GroupPlanMealsFragment = gql`
  fragment GroupPlanMeals on Group {
    planMealsConnection {
      edges {
        ...GroupPlanMealsEdgeFragment
      }
    }
  }
  ${GroupPlanMealsEdgeFragment}
`;

export const useAddPlanMeal = ({ groupId }: { groupId: string }) =>
  useMutation<AddPlanMealResult, { input: AddPlanMealInput }>(
    AddPlanMealMutation,
    {
      update: async (cache, result) => {
        const id = `Group:${groupId}`;

        const group = await cache.readFragment<{
          planMealsConnection: {
            edges: GroupPlanMealEdge[];
          };
        }>({
          id,
          fragmentName: 'GroupPlanMeals',
          fragment: GroupPlanMealsFragment,
        });

        if (!group) {
          logger.warn(
            `Could not query group fragment ${groupId} to update plan after meal add`,
          );
          return;
        }

        const edges = [
          ...group.planMealsConnection.edges,

          result.data.addPlanMeal.planMealEdge,
        ];

        await cache.writeFragment({
          id,
          fragmentName: 'GroupPlanMeals',
          fragment: GroupPlanMealsFragment,
          data: {
            __typename: 'Group',
            planMealsConnection: {
              __typename: 'GroupPlanMealsConnection',
              edges,
            },
          },
        });
      },
    },
  );
