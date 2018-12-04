import gql from 'graphql-tag';

export default {
  plan: gql`
    fragment CalendarPlan on Plan {
      id
      groceryDay
    }
  `,
  meals: gql`
    fragment CalendarMeals on PlanMeal {
      id
      date
      dateIndex
      actions {
        id
        type
      }
    }
  `,
};
