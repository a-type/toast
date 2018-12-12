import * as React from 'react';
import CalendarMealSetRecipeMutation from '../CalendarMealSetRecipeMutation';
import { RecipeSelector } from 'features/plan';
import { MealActionCook } from 'generated/schema';
import { Card, Button } from 'components/generic';
import logger from 'logger';
import { pathOr } from 'ramda';
import { Span } from 'components/typeset';
import RecipePreviewQuery from './RecipePreviewQuery';

interface CalendarCookActionProps {
  dateIndex: number;
  mealIndex: number;
  action: MealActionCook;
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

  renderCard = () => {
    const { action } = this.props;
    const { loading } = this.state;
    const recipeId = action.recipeId || null;

    if (recipeId) {
      return (
        <RecipePreviewQuery variables={{ recipeId }}>
          {({ data, networkStatus, error }) => {
            if (networkStatus < 7) {
              return <Card.Skeleton />;
            }

            if (error) {
              logger.fatal(error);
              return <Card.Skeleton />;
            }

            const recipe = pathOr({}, ['recipe'], data);
            const image = pathOr(null, ['recipe', 'coverImage', 'url'], data);

            return (
              <Card imageSrc={image}>
                <Span>{recipe.title}</Span>
                <Button onClick={this.showRecipeSelector}>Change</Button>
              </Card>
            );
          }}
        </RecipePreviewQuery>
      );
    }

    if (loading) {
      return <Card.Skeleton />;
    }

    return <Card onClick={this.showRecipeSelector}>No recipe selected</Card>;
  };

  render() {
    const { showRecipeSelector } = this.state;
    const { action, dateIndex, mealIndex } = this.props;

    return (
      <React.Fragment>
        {this.renderCard()}
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
                        dateIndex,
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
