import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';

export const GroupPlanMealsEdgeFragment = gql`
  fragment MealRecipeFragment on Recipe {
    id
    title
    attribution
    sourceUrl
    description
    coverImageUrl
  }

  fragment GroupPlanMealsEdgeFragment on GroupPlanMealsEdge {
    cursor
    node {
      id
      date
      mealName
      servings
      note
      cooking {
        ...MealRecipeFragment
      }
    }
  }
`;

export const GetPlanQuery = gql`
  query GetPlanQuery {
    viewer {
      id
      group {
        id
        planMealsConnection {
          edges {
            ...GroupPlanMealsEdgeFragment
          }
        }
      }
    }
  }

  ${GroupPlanMealsEdgeFragment}
`;

export type GetPlanQueryResult = {
  viewer: {
    id: string;
    group?: {
      id: string;
      planMealsConnection: {
        edges: GroupPlanMealEdge[];
      };
    };
  };
};

export type GroupPlanMealEdge = {
  cursor: string;
  node: PlanMeal;
};

export type PlanMeal = {
  id: string;
  date: string;
  mealName: string;
  note: string | null;
  cooking: PlanRecipe | null;
};

export type PlanRecipe = {
  id: string;
  title: string;
  attribution: string | null;
  sourceUrl: string | null;
  description: string | null;
  coverImageUrl: string;
};

export default () => useQuery<GetPlanQueryResult>(GetPlanQuery);
