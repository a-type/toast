import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { GetPlanQuery } from './usePlan';
import logger from 'logger';

export const RemovePlanMealMutation = gql`
  mutation RemovePlanMealMutation($input: RemovePlanMealInput!) {
    removePlanMeal(input: $input) {
      planMeal {
        id
      }
    }
  }
`;

export type RemovePlanMealInput = {
  id: string;
};

export type RemovePlanMealResult = {
  removePlanMeal: {
    planMeal: {
      id: string;
    };
  };
};

const GroupPlanMealsFragment = gql`
  fragment GroupPlanMeals on Group {
    planMealsConnection {
      edges {
        node {
          id
        }
      }
    }
  }
`;

export const useRemovePlanMeal = ({ groupId }: { groupId: string }) =>
  useMutation<RemovePlanMealResult, { input: RemovePlanMealInput }>(
    RemovePlanMealMutation,
    {
      update: async (cache, result) => {
        const id = `Group:${groupId}`;

        const group = await cache.readFragment<any>({
          id,
          fragmentName: 'GroupPlanMeals',
          fragment: GroupPlanMealsFragment,
        });

        if (!group) {
          logger.warn(
            `Could not query group fragment ${groupId} to update plan after meal remove`,
          );
          return;
        }

        const edges = group.planMealsConnection.edges.filter(
          edge => edge.node.id !== result.data.removePlanMeal.planMeal.id,
        );

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
