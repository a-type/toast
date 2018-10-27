import * as React from 'react';
import gql from 'graphql-tag';
import { Card, Tip, Button } from 'components/generic';
import { PlanMeal, PlanActionType, Plan } from 'generated/schema';
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

  getMealType = (): PlanActionType => {
    const {
      meal: { actions },
    } = this.props;

    const proiritizedActionTypes: PlanActionType[] = [
      PlanActionType.COOK,
      PlanActionType.EAT,
      PlanActionType.EAT_OUT,
      PlanActionType.READY_MADE,
      PlanActionType.SKIP,
    ];

    for (let i in proiritizedActionTypes) {
      const t = proiritizedActionTypes[i];
      if (actions.find(action => action.type === t)) {
        return t;
      }
    }

    return PlanActionType.SKIP;
  };

  showRecipeSelector = () => this.setState({ showRecipeSelector: true });
  hideRecipeSelector = () => this.setState({ showRecipeSelector: false });

  setRecipe = () => {};

  renderContent = (mealType: PlanActionType) => {
    if (mealType === PlanActionType.COOK) {
      return <Button onClick={this.showRecipeSelector}>Choose Recipe</Button>;
    }
  };

  render() {
    const mealType = this.getMealType();
    const { showRecipeSelector } = this.state;

    return (
      <React.Fragment>
        <Tip.Toggle tipContent={this.renderContent(mealType)}>
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
