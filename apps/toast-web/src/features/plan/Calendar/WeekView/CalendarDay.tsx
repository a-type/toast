import * as React from 'react';
import { PlanMeal } from 'generated/schema';
import CalendarMeal from '../CalendarMeal';
import MealRow from '../components/MealRow';
import { isPast, endOfDay } from 'date-fns';

type Props = {
  meals: PlanMeal[];
};

export default class CalendarDay extends React.Component<Props, any> {
  static fragments = {
    meals: CalendarMeal.fragments.meal,
  };

  render() {
    const { meals } = this.props;
    const date = meals[0].date;

    const past = isPast(endOfDay(date));

    return (
      <MealRow past={past}>
        {meals.map(meal => (
          <CalendarMeal key={meal.id} meal={meal} />
        ))}
      </MealRow>
    );
  }
}
