import * as React from 'react';
import { Card } from 'components/generic';
import { MealActionEat } from 'generated/schema';
import { pathOr } from 'ramda';
import { HelpText } from 'components/text';
import { Text } from 'grommet';

interface CalendarEatActionProps {
  action: MealActionEat;
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
      return (
        <Text>
          <HelpText>Leftovers</HelpText> {recipe.title}
        </Text>
      );
    }
    return (
      <HelpText>
        Leftovers
        {cookDay === null ? '' : ` from ${DAYS[cookDay]}`}
      </HelpText>
    );
  };

  render() {
    return (
      <Card imageSrc={this.getCardImage()}>{this.renderCardContents()}</Card>
    );
  }
}
