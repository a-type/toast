import gql from 'graphql-tag';
import CalendarMeal from '../MealView';

export default {
  meals: gql`
    fragment CalendarDayViewMeals on PlanMeal {
      ...CalendarMeal
    }

    ${CalendarMeal.fragments.meal}
  `,
};
