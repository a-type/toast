import * as React from 'react';
import styled from 'styled-components';
import { MealActionType } from 'generated/schema';
import { focusShadow } from 'components/effects';
import getPrimaryAction from 'features/plan/getPrimaryAction';
import { getDate } from 'date-fns';
import { ITEM_SIZE } from '../constants';
import { Day } from 'components/generic/Calendar/components';

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

export const DayItemButton = styled<DayItemButtonProps>(
  ({ actionType, selected, ...rest }) => <Day {...rest} />,
)`
  border: ${getBorder};
  background: ${getBackground};
  color: ${getColor};

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
    <DayItemButton actionType={actionType} selected={selected} {...rest}>
      <span>{getDate(date)}</span>
    </DayItemButton>
  );
};

export default DayItem;
