import * as React from 'react';
import {
  Grid,
  Day,
  ExpandButton,
  MonthContainer,
  WeekdayRow,
} from './components';
import { cold } from 'react-hot-loader';
import {
  startOfWeek,
  addDays,
  getDate,
  getMonth,
  addMonths,
  startOfMonth,
  isSameDay,
  endOfWeek,
} from 'date-fns';
import { Label } from 'components/typeset';
import { MONTH_NAMES, WEEKDAY_ABBREVIATIONS } from './constants';
import { CrossFade, Icon } from 'components/generic';
import { Button, Heading } from 'grommet';
import { CalendarTransition, GridPosition } from './types';

export interface DateProps {
  title: string;
  value: number;
  onClick(): void;
  key: string;
}

export interface DateRenderParams {
  date: Date;
  otherMonth: boolean;
  selected: boolean;
  props: DateProps;
}

export type CalendarProps = {
  value: Date;
  onChange?(date: Date): void;
  renderDate?: (params: DateRenderParams) => React.ReactNode;
  onMonthChange?: (firstDay: Date) => void;
};

const defaultRenderDate = ({
  date,
  props,
  selected,
  otherMonth,
}: DateRenderParams) => (
  <Day {...props} selected={selected} faded={otherMonth}>
    {getDate(date)}
  </Day>
);

type GridViewProps = {
  rowCount: number;
  startDate: Date;
  month: number;
  position: GridPosition;
  transitionName: CalendarTransition;
  prepForMove: boolean;
  renderDate?: (params: DateRenderParams) => React.ReactNode;
  onChange?(date: Date): void;
  value: Date;
};

const GridView: React.SFC<GridViewProps> = ({
  rowCount,
  startDate,
  month,
  renderDate = defaultRenderDate,
  onChange = () => {},
  value,
  ...rest
}) => {
  return (
    <Grid {...rest} rows={rowCount}>
      {new Array(rowCount * 7).fill(null).map((_, idx) => {
        const date = addDays(startDate, idx);
        const title = date.toString();
        const otherMonth = date.getMonth() !== month;
        const selected = isSameDay(date, value);
        return renderDate({
          date,
          otherMonth,
          selected,
          props: {
            value: date.getTime(),
            title,
            onClick: () => onChange(date),
            key: `${date.getTime()}`,
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

type CalendarComponent = React.SFC<CalendarProps> & {
  Day?: typeof Day;
};

const Calendar: CalendarComponent = ({ onMonthChange = () => {}, ...rest }) => {
  const [expanded, setExpanded] = React.useState(false);
  const toggleExpanded = () => setExpanded(current => !current);
  const [firstDayOfCurrentPage, setFirstDayOfCurrentPage] = React.useState(
    startOfWeek(startOfMonth(rest.value)),
  );
  const [transitionName, setTransitionName] = useMonthTransition();
  const [isHoveringButton, setIsHoveringButton] = React.useState(false);

  const rowCount = expanded ? 6 : 2;
  const month = getMonth(endOfWeek(firstDayOfCurrentPage));

  const startDate = expanded ? firstDayOfCurrentPage : startOfWeek(rest.value);

  const nextMonth = addMonths(
    startOfMonth(endOfWeek(firstDayOfCurrentPage)),
    1,
  );
  const previousMonth = addMonths(
    startOfMonth(endOfWeek(firstDayOfCurrentPage)),
    -1,
  );
  const goToNextMonth = () => {
    setTransitionName(CalendarTransition.Backwards);
    setFirstDayOfCurrentPage(startOfWeek(nextMonth));
    onMonthChange(nextMonth);
  };
  const goToPreviousMonth = () => {
    setTransitionName(CalendarTransition.Forwards);
    setFirstDayOfCurrentPage(startOfWeek(previousMonth));
    onMonthChange(previousMonth);
  };

  const onButtonHover = () => setIsHoveringButton(true);
  const onButtonLeave = () => setIsHoveringButton(false);

  return (
    <div>
      <CrossFade>
        {expanded ? (
          <MonthContainer>
            <Button
              icon={<Icon name="expand-arrow" rotation={90} />}
              onClick={goToPreviousMonth}
              onMouseOver={onButtonHover}
              onTouchStart={onButtonHover}
              onMouseLeave={onButtonLeave}
              onTouchEnd={onButtonLeave}
            />
            <Heading level="4">{MONTH_NAMES[month]}</Heading>
            <Button
              icon={<Icon name="expand-arrow" rotation={270} />}
              onClick={goToNextMonth}
              onMouseOver={onButtonHover}
              onTouchStart={onButtonHover}
              onMouseLeave={onButtonLeave}
              onTouchEnd={onButtonLeave}
            />
          </MonthContainer>
        ) : null}
      </CrossFade>
      <WeekdayRow>
        {new Array(7).fill(null).map((_, idx) => (
          <Label key={`weekday_${idx}`}>{WEEKDAY_ABBREVIATIONS[idx]}</Label>
        ))}
      </WeekdayRow>
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

Calendar.Day = Day;

export default cold(Calendar);
