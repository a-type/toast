import * as React from 'react';
import gql from 'graphql-tag';
import { Card, Tip, Button } from 'components/generic';
import { PlanMeal } from 'generated/schema';

export type Props = {
  meal: PlanMeal;
};

export default class CalendarMeal extends React.Component<any, any> {
  static fragments = {
    meal: gql`
      fragment CalendarMeal on PlanMeal {
        id
        actions {
          type

          ... on PlanActionCook {
            servings
            mealType
          }

          ... on PlanActionEat {
            leftovers
            cookAction {
              servings
              mealType
            }
          }
        }
      }
    `,
  };

  getMealType = (): 'COOK' | 'EAT' | 'SKIP' => {
    const {
      meal: { actions },
    } = this.props;

    if (actions.find(action => action.type === 'COOK')) {
      return 'COOK';
    }

    if (actions.find(action => action.type === 'EAT')) {
      return 'EAT';
    }

    return 'SKIP';
  };

  renderContent = () => {
    return <Button>Choose Recipe</Button>;
  };

  render() {
    const mealType = this.getMealType();

    return (
      <Tip.Toggle tipContent={this.renderContent()}>
        {({ ref, onClick }) => (
          <Card ref={ref} onClick={onClick}>
            {mealType}
          </Card>
        )}
      </Tip.Toggle>
    );
  }
}
