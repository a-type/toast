import * as React from 'react';
import { Grid, Day, ExpandButton, MonthContainer } from './components';
import { cold } from 'react-hot-loader';
import {
  startOfWeek,
  addDays,
  getDate,
  getMonth,
  addMonths,
  startOfMonth,
} from 'date-fns';
import { H3 } from 'components/typeset';
import { MONTH_NAMES } from './constants';
import { CrossFade } from 'components/generic';
import Button from '../Button';
import { CalendarTransition, GridPosition } from './types';

export interface DateProps {
  title: string;
  value: number;
  onClick(): void;
}

export interface DateRenderParams {
  date: Date;
  otherMonth: boolean;
  props: DateProps;
}

export type CalendarProps = React.HTMLAttributes<HTMLDivElement> & {
  value: Date;
  onChange(date: Date): void;
  renderDate?: (params: DateRenderParams) => React.ReactNode;
};

const defaultRenderDate = ({ date, props, otherMonth }: DateRenderParams) => (
  <Day {...props} faded={otherMonth}>
    {getDate(date)}
  </Day>
);

type ExtraGridViewProps = {
  rowCount: number;
  startDate: Date;
  month: number;
  position: GridPosition;
  transitionName: CalendarTransition;
  prepForMove: boolean;
};

const GridView: React.SFC<CalendarProps & ExtraGridViewProps> = ({
  rowCount,
  startDate,
  month,
  renderDate = defaultRenderDate,
  onChange,
  ...rest
}) => {
  return (
    <Grid {...rest} rows={rowCount}>
      {new Array(rowCount * 7).fill(null).map((_, idx) => {
        const date = addDays(startDate, idx);
        const title = date.toString();
        const otherMonth = date.getMonth() !== month;
        return renderDate({
          date,
          otherMonth,
          props: {
            value: date.getDate(),
            title,
            onClick: () => onChange(date),
          },
        });
      })}
    </Grid>
  );
};

const useMonthTransition = (): [
  CalendarTransition,
  (newTransition: CalendarTransition) => void
] => {
  const [transitionName, setTransitionName] = React.useState<
    CalendarTransition
  >(CalendarTransition.None);
  const timeoutSet = (newTransitionName: CalendarTransition) => {
    setTransitionName(newTransitionName);
    setTimeout(() => setTransitionName(CalendarTransition.None), 200);
  };
  return [transitionName, timeoutSet];
};

const Calendar: React.SFC<CalendarProps> = ({ ...rest }) => {
  const [expanded, setExpanded] = React.useState(false);
  const toggleExpanded = () => setExpanded(current => !current);
  const [internalStartDate, setStartDate] = React.useState(
    startOfWeek(new Date()),
  );
  const [transitionName, setTransitionName] = useMonthTransition();
  const [isHoveringButton, setIsHoveringButton] = React.useState(false);

  const rowCount = expanded ? 6 : 2;
  const month = getMonth(internalStartDate);

  const startDate = expanded
    ? startOfWeek(startOfMonth(internalStartDate))
    : internalStartDate;

  const nextMonth = addMonths(startOfMonth(internalStartDate), 1);
  const previousMonth = addMonths(startOfMonth(internalStartDate), -1);
  const goToNextMonth = () => {
    setTransitionName(CalendarTransition.Backwards);
    setStartDate(nextMonth);
  };
  const goToPreviousMonth = () => {
    setTransitionName(CalendarTransition.Forwards);
    setStartDate(previousMonth);
  };

  const onButtonHover = () => setIsHoveringButton(true);
  const onButtonLeave = () => setIsHoveringButton(false);

  return (
    <div>
      <CrossFade>
        {expanded ? (
          <MonthContainer>
            <Button.Icon
              name="expand-arrow"
              iconProps={{ rotation: 90 }}
              onClick={goToPreviousMonth}
              onMouseOver={onButtonHover}
              onTouchStart={onButtonHover}
              onMouseLeave={onButtonLeave}
              onTouchEnd={onButtonLeave}
            />
            <H3>{MONTH_NAMES[month]}</H3>
            <Button.Icon
              name="expand-arrow"
              iconProps={{ rotation: 270 }}
              onClick={goToNextMonth}
              onMouseOver={onButtonHover}
              onTouchStart={onButtonHover}
              onMouseLeave={onButtonLeave}
              onTouchEnd={onButtonLeave}
            />
          </MonthContainer>
        ) : null}
      </CrossFade>
      <GridView
        rowCount={rowCount}
        startDate={startDate}
        month={month}
        position={GridPosition.Current}
        transitionName={transitionName}
        prepForMove={isHoveringButton}
        {...rest}
      />
      <ExpandButton onClick={toggleExpanded} expanded={expanded} />
    </div>
  );
};

export default cold(Calendar);
