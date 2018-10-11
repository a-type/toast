import React from 'react';
import gql from 'fraql';
import { Icon } from 'components/generic';
import styled from 'styled-components';

const fragments = {
  action: gql`
    fragment ActionView on PlanAction {
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
      }

      ... on PlanActionReadyMade {
        note
      }
    }
  `,
};

const getIcon = type => {
  switch (type) {
    case 'EAT_OUT':
      return 'waiter';
    case 'COOK':
      return 'chef-toque';
    case 'EAT':
      return 'microwave';
    case 'READY_MADE':
      return 'microwave';
    default:
      return 'skip-this-track';
  }
};

const getLabel = type => {
  switch (type) {
    case 'EAT_OUT':
      return 'Eat out';
    case 'COOK':
      return 'Cook';
    case 'EAT':
      return 'Leftovers';
    case 'READY_MADE':
      return 'Ready-made';
    default:
      return 'Skip';
  }
};

const getColor = type => {
  switch (type) {
    case 'COOK':
      return 'var(--color-positive-light)';
    case 'EAT':
      return 'var(--color-brand-light)';
    default:
      return 'var(--color-gray-lightest)';
  }
};

const getForeground = type => {
  switch (type) {
    case 'COOK':
      return 'var(--color-positive-dark)';
    case 'EAT':
      return 'var(--color-brand-dark)';
    default:
      return 'var(--color-black)';
  }
};

const Border = styled.div`
  background: ${props => getColor(props.type)};
  color: ${props => getForeground(props.type)};
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-md);
`;

const ActionView = ({ action, ...rest }) => (
  <Border {...rest} type={action.type}>
    <Icon name={getIcon(action.type)} /> <span>{getLabel(action.type)}</span>
  </Border>
);

ActionView.fragments = fragments;

export default ActionView;
