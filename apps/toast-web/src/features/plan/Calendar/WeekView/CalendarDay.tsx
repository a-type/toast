import * as React from 'react';
import { PlanDay } from 'generated/schema';
import gql from 'graphql-tag';
import CalendarMeal from '../CalendarMeal';
import MealRow from '../components/MealRow';

type Props = {
  day: PlanDay;
  weekIndex: number;
  dayIndex: number;
};

export default class CalendarDay extends React.Component<Props, any> {
  static fragments = {
    day: gql`
      fragment CalendarDay on PlanDay {
        id
        date
        meals {
          ...CalendarMeal
        }
      }

      ${CalendarMeal.fragments.meal}
    `,
  };

  render() {
    const {
      day: { meals },
      weekIndex,
      dayIndex,
    } = this.props;

    return (
      <MealRow>
        {meals.map((meal, mealIndex) => (
          <CalendarMeal
            key={meal.id}
            weekIndex={weekIndex}
            dayIndex={dayIndex}
            mealIndex={mealIndex}
            meal={meal}
          />
        ))}
      </MealRow>
    );
  }
}
