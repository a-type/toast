import gql from 'graphql-tag';
import CalendarMeal from '../MealView';

export default {
  meals: gql`
    fragment CalendarDayViewMeals on PlanMeal {
      id
      ...CalendarMeal
    }

    ${CalendarMeal.fragments.meal}
  `,
};
