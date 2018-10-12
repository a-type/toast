import React from 'react';
import gql from 'fraql';
import styled from 'styled-components';

const getCookAction = actions => actions.find(action => action.type === 'COOK');
const getEatAction = actions => actions.find(action => action.type === 'EAT');

const Bubble = styled.div`
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
`;

const Title = styled.div`
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  background: var(--color-white);
  color: var(--color-black);
`;

const MainMeal = ({ meal }) => {
  if (!meal) {
    return null;
  }

  const cookAction = getCookAction(meal.actions);

  if (cookAction) {
    return (
      <Bubble>
        <Title>Cook</Title>
      </Bubble>
    );
  }
};

MainMeal.fragments = {
  meal: gql`
    fragment MainMeal on PlanMeal {
      actions {
        type

        ... on PlanActionEatOut {
          note
        }

        ... on PlanActionCook {
          servings
          mealType
        }

        ... on PlanActionEat {
          mealDay
          mealIndex
          leftovers
          cookAction {
            servings
            mealType
          }
        }

        ... on PlanActionReadyMade {
          note
        }
      }
    }
  `,
};

export default MainMeal;
