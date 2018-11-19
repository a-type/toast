import * as React from 'react';
import { PlanMeal } from 'generated/schema';
import CalendarMeal from '../CalendarMeal';
import MealRow from '../components/MealRow';

type Props = {
  meals: PlanMeal[];
};

export default class CalendarDay extends React.Component<Props, any> {
  static fragments = {
    meals: CalendarMeal.fragments.meal,
  };

  render() {
    const { meals } = this.props;

    return (
      <MealRow>
        {meals.map(meal => (
          <CalendarMeal key={meal.id} meal={meal} />
        ))}
      </MealRow>
    );
  }
}
