import * as React from 'react';
import gql from 'graphql-tag';
import { Card, Tip, Button } from 'components/generic';
import { PlanMeal } from 'generated/schema';
import { RecipeSelector } from 'features/plan';

interface CalendarMealProps {
  meal: PlanMeal;
  weekIndex: number;
}

interface CalendarMealState {
  showRecipeSelector: boolean;
}

export default class CalendarMeal extends React.Component<
  CalendarMealProps,
  CalendarMealState
> {
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

  state = {
    showRecipeSelector: false,
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

  showRecipeSelector = () => this.setState({ showRecipeSelector: true });
  hideRecipeSelector = () => this.setState({ showRecipeSelector: false });

  setRecipe = () => {};

  renderContent = () => {
    return <Button onClick={this.showRecipeSelector}>Choose Recipe</Button>;
  };

  render() {
    const mealType = this.getMealType();
    const { showRecipeSelector } = this.state;

    return (
      <React.Fragment>
        <Tip.Toggle tipContent={this.renderContent()}>
          {({ ref, onClick }) => (
            <Card ref={ref} onClick={onClick}>
              {mealType}
            </Card>
          )}
        </Tip.Toggle>
        {showRecipeSelector && (
          <RecipeSelector
            onCancel={this.hideRecipeSelector}
            onChange={this.setRecipe}
          />
        )}
      </React.Fragment>
    );
  }
}
