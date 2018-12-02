import * as React from 'react';
import styled from 'styled-components';
import { MealActionType, PlanMeal } from 'generated/schema';
import { focusShadow } from 'components/effects';
import getPrimaryAction from 'features/plan/getPrimaryAction';
import { getDate } from 'date-fns';
import { ITEM_SIZE } from '../constants';

export interface DayItemButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  actionType: MealActionType;
  selected: boolean;
}

const getBackground = (props: DayItemButtonProps) => {
  if (!props.selected) {
    return 'var(--color-white)';
  }

  switch (props.actionType) {
    case MealActionType.COOK:
      return 'var(--color-brand-light)';
    default:
      return 'var(--color-white)';
  }
};

const getColor = () => {
  return 'var(--color-dark)';
};

const getBorder = (props: DayItemButtonProps) => {
  switch (props.actionType) {
    case MealActionType.SKIP:
    case undefined:
    case null:
      return `2px dashed var(--color-gray-light)`;
    default:
      return `2px solid ${getBackground({ ...props, selected: true })}`;
  }
};

export const DayItemButton = styled<DayItemButtonProps, 'button'>('button')`
  border: ${getBorder};
  background: ${getBackground};
  color: ${getColor};
  display: flex;
  width: ${ITEM_SIZE}px;
  height: ${ITEM_SIZE}px;
  border-radius: var(--border-radius-md);
  font-family: var(--font-default);
  font-size: var(--font-size-md);

  &:focus {
    outline: 0;
    box-shadow: ${focusShadow.default};
  }

  & > * {
    margin: auto;
  }
`;

export interface DayItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  meals: PlanMeal[];
  date: Date;
  onSelected(): void;
  selected: boolean;
}

const DayItem: React.SFC<DayItemProps> = ({
  date,
  meals,
  onSelected,
  selected,
  ...rest
}) => {
  const action = getPrimaryAction(meals);
  return (
    <DayItemButton
      actionType={action.type}
      onClick={onSelected}
      selected={selected}
      {...rest}
    >
      <span>{getDate(date)}</span>
    </DayItemButton>
  );
};

export default DayItem;
