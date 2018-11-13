import * as React from 'react';
import CalendarMealSetRecipeMutation from './CalendarMealSetRecipeMutation';
import { RecipeSelector } from 'features/plan';
import { PlanActionCook } from 'generated/schema';
import { Card, Icon } from 'components/generic';
import CardBox from 'components/generic/Card/Box';
import logger from 'logger';
import { pathOr } from 'ramda';
import styled from 'styled-components';

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

const EmptyCard = styled(CardBox)`
  background: var(--color-gray-lightest);
  border-color: var(--color-gray-lightest);
  display: flex;
  height: 100%;
  color: var(--color-gray);
  cursor: pointer;

  & > * {
    margin: auto;
  }
`;

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

  renderCard = () => {
    const { action } = this.props;
    const { loading } = this.state;
    const recipe = action.recipe || null;

    if (recipe) {
      return <Card imageSrc={this.getCardImage()}>{recipe.title}</Card>;
    }

    if (loading) {
      return <Card.Skeleton />;
    }

    return (
      <EmptyCard onClick={this.showRecipeSelector}>
        <Icon name="add" size="60px" />
      </EmptyCard>
    );
  };

  render() {
    const { showRecipeSelector } = this.state;
    const { weekIndex, action } = this.props;

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
                        weekIndex,
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
