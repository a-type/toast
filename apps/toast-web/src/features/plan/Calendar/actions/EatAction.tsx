import * as React from 'react';
import { Card } from 'components/generic';
import { PlanActionEat } from 'generated/schema';
import { pathOr } from 'ramda';

interface CalendarEatActionProps {
  action: PlanActionEat;
  weekIndex: number;
  dayIndex: number;
  mealIndex: number;
}

const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export default class CalendarEatAction extends React.Component<
  CalendarEatActionProps
> {
  getCardImage = () => {
    const { action } = this.props;
    const url = pathOr(
      null,
      ['cookAction', 'recipe', 'coverImage', 'url'],
      action,
    );
    return url;
  };

  renderCardContents = () => {
    const { action } = this.props;
    const recipe = pathOr(null, ['cookAction', 'recipe'], action);
    const cookDay = pathOr(null, ['cookAction', 'dayIndex'], action);
    if (recipe) {
      return `Leftovers: ${recipe.title}`;
    }
    return `Leftovers from ${cookDay === null ? '...' : DAYS[cookDay]}`;
  };

  render() {
    return (
      <Card imageSrc={this.getCardImage()}>{this.renderCardContents()}</Card>
    );
  }
}
