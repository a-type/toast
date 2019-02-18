import * as React from 'react';
import CalendarMealSetRecipeMutation from '../CalendarMealSetRecipeMutation';
import { RecipeSelector } from 'features/plan';
import { MealActionCook } from 'generated/schema';
import { Card } from 'components/generic';
import logger from 'logger';
import { pathOr } from 'ramda';
import RecipePreviewQuery from './RecipePreviewQuery';
import { Text, Button } from 'grommet';
import { CardSkeleton } from 'components/skeletons';
import { Link } from 'components/text';

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
              return <CardSkeleton />;
            }

            if (error) {
              logger.fatal(error);
              return <CardSkeleton />;
            }

            const recipe = pathOr({}, ['recipe'], data);
            const image = pathOr(null, ['recipe', 'coverImage', 'url'], data);

            return (
              <Card imageSrc={image}>
                <Link
                  margin={{ bottom: 'medium' }}
                  to={`/recipes/${recipe.id}`}
                >
                  {recipe.title}
                </Link>
                <Button onClick={this.showRecipeSelector} label="Change" />
              </Card>
            );
          }}
        </RecipePreviewQuery>
      );
    }

    if (loading) {
      return <CardSkeleton />;
    }

    return (
      <Card>
        <Text margin={{ bottom: 'medium' }}>No recipe selected.</Text>
        <Button onClick={this.showRecipeSelector} label="Pick one" />
      </Card>
    );
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
