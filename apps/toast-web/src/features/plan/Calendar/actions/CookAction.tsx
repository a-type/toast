import * as React from 'react';
import CalendarMealSetRecipeMutation from './CalendarMealSetRecipeMutation';
import { RecipeSelector } from 'features/plan';
import { PlanActionCook } from 'generated/schema';
import { Card, Loader } from 'components/generic';
import logger from 'logger';
import { pathOr } from 'ramda';

interface CalendarCookActionProps {
  action: PlanActionCook;
  weekIndex: number;
  dayIndex: number;
  mealIndex: number;
}

interface CalendarCookActionState {
  showRecipeSelector: boolean;
  loading: boolean;
  error: Error | null;
}

export default class CalendarCookAction extends React.Component<
  CalendarCookActionProps,
  CalendarCookActionState
> {
  state = {
    showRecipeSelector: false,
    loading: false,
    error: null,
  };

  showRecipeSelector = () => this.setState({ showRecipeSelector: true });
  hideRecipeSelector = () => this.setState({ showRecipeSelector: false });

  getCardImage = () => {
    const { action } = this.props;
    const url = pathOr(null, ['recipe', 'coverImage', 'url'], action);
    return url;
  };

  renderCardContents = () => {
    const { action } = this.props;
    const { loading } = this.state;
    const recipe = action.recipe || null;

    if (recipe) {
      return recipe.title;
    }

    if (loading) {
      return <Loader size={50} />;
    }

    return 'Choose a recipe';
  };

  render() {
    const { showRecipeSelector } = this.state;
    const { weekIndex, dayIndex, mealIndex, action } = this.props;

    return (
      <React.Fragment>
        <Card onClick={this.showRecipeSelector} imageSrc={this.getCardImage()}>
          {this.renderCardContents()}
        </Card>
        {showRecipeSelector && (
          <CalendarMealSetRecipeMutation>
            {mutate => (
              <RecipeSelector
                onCancel={this.hideRecipeSelector}
                onChange={async recipe => {
                  this.setState({ loading: true });

                  try {
                    await mutate({
                      variables: {
                        weekIndex,
                        dayIndex,
                        mealIndex,
                        actionId: action.id,
                        recipeId: recipe.id,
                      },
                    });
                    this.setState({ loading: false });
                  } catch (err) {
                    logger.fatal(err);
                    this.setState({
                      loading: false,
                      error: err,
                    });
                  }
                }}
              />
            )}
          </CalendarMealSetRecipeMutation>
        )}
      </React.Fragment>
    );
  }
}
