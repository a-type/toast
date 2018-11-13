import * as React from 'react';
import { PlanWeekMeal } from 'generated/schema';
import CalendarMeal from '../CalendarMeal';
import MealRow from '../components/MealRow';

type Props = {
  meals: PlanWeekMeal[];
  weekIndex: number;
  dayIndex: number;
};

export default class CalendarDay extends React.Component<Props, any> {
  static fragments = {
    meals: CalendarMeal.fragments.meal,
  };

  render() {
    const { meals, weekIndex, dayIndex } = this.props;

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
