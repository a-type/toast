import React, { FC } from 'react';
import styled from 'styled-components';
import { Icon, useCardLayout, LayoutMode } from 'components/generic';
import { Text } from 'grommet';

const Border = styled<{ layoutMode: LayoutMode }, 'div'>('div')`
  border-radius: var(--border-radius-lg);
  background: var(--color-gray-lightest);
  display: grid;
  grid-template-areas: ${props => {
    if (props.layoutMode === LayoutMode.Vertical) {
      return '"cook" "eat"';
    } else if (props.layoutMode === LayoutMode.Horizontal) {
      return '"cook eat"';
    }
    return '"cook eat"';
  }};

  & > *:nth-child(1) {
    grid-area: cook;
  }

  & > *:nth-child(2) {
    grid-area: eat;
  }
`;

const IconButton = styled.button`
  display: flex;
  border: 0;
  outline: 0;
  cursor: pointer;
  flex-direction: column;
  margin: auto;
  background: transparent;

  & > * {
    margin: var(--spacing-sm) auto;
  }
`;

interface EmptyMealProps {
  onChooseRecipe(): void;
}

export const EmptyMeal: FC<EmptyMealProps> = ({ onChooseRecipe }) => {
  const [ref, layoutMode] = useCardLayout();

  return (
    <Border ref={ref} layoutMode={layoutMode}>
      <IconButton onClick={onChooseRecipe}>
        <Icon name="chef-toque" size="60px" />
        <Text>Cook</Text>
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon name="waiter" size="60px" />
        <Text>Eat</Text>
      </IconButton>
    </Border>
  );
};

export default EmptyMeal;
