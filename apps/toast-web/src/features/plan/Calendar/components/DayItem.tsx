import * as React from 'react';
import styled from 'styled-components';
import { MealActionType } from 'generated/schema';
import { focusShadow } from 'components/effects';
import getPrimaryAction from 'features/plan/getPrimaryAction';
import { getDate, isToday } from 'date-fns';
import { ITEM_SIZE } from '../constants';
import { Day } from 'components/generic/Calendar/components';

export interface DayItemButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  actionType: MealActionType;
  selected: boolean;
  date: Date;
}

const getBackground = (props: DayItemButtonProps) => {
  if (props.selected) {
    return 'var(--color-brand)';
  }

  return 'var(--color-white)';
};

const getColor = (props: DayItemButtonProps) => {
  return `var(--color-dark)`;
};

const getBorder = (props: DayItemButtonProps) => {
  if (props.selected) {
    return `2px solid var(--color-brand)`;
  }

  switch (props.actionType) {
    case MealActionType.SKIP:
    case undefined:
    case null:
      return `2px dashed var(--color-gray-light)`;
    case MealActionType.COOK:
      return `2px solid var(--color-brand)`;
    default:
      return `2px solid var(--color-gray-light)`;
  }
};

export const DayItemButton = styled<DayItemButtonProps>(
  ({ actionType, selected, ...rest }) => <Day {...rest} />,
)`
  border: ${getBorder};
  background: ${getBackground};
  color: ${getColor};
  font-weight: ${props => (isToday(props.date) ? 'bold' : 'normal')};

  &:focus {
    outline: 0;
    box-shadow: ${focusShadow.default};
  }
`;

export interface DayItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  actionType: MealActionType;
  date: Date;
  selected: boolean;
}

const DayItem: React.SFC<DayItemProps> = ({
  date,
  actionType,
  selected,
  ...rest
}) => {
  return (
    <DayItemButton
      actionType={actionType}
      date={date}
      selected={selected}
      {...rest}
    >
      <span>{getDate(date)}</span>
    </DayItemButton>
  );
};

export default DayItem;
