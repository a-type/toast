import React, { FC, ReactNode } from 'react';
import { Grid, Day, MonthContainer, WeekdayRow } from './components';
import {
  addDays,
  getDate,
  getMonth,
  isSameDay,
  endOfWeek,
  differenceInDays,
  startOfWeek,
  isWithinRange,
} from 'date-fns';
import { Label, Heading } from 'components/text';
import { MONTH_NAMES, WEEKDAY_ABBREVIATIONS } from './constants';

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
  disabled: boolean;
}

export type CalendarProps = {
  value?: Date;
  onChange?(date: Date): void;
  renderDate?: (params: DateRenderParams) => ReactNode;
  startDate?: Date;
  endDate?: Date;
};

const defaultRenderDate = ({
  date,
  props,
  selected,
  otherMonth,
  disabled,
}: DateRenderParams) => (
  <Day {...props} selected={selected} faded={otherMonth} disabled={disabled}>
    {getDate(date)}
  </Day>
);

type CalendarGridViewProps = {
  startDate: Date;
  endDate: Date;
  month?: number;
  renderDate?: (params: DateRenderParams) => ReactNode;
  onChange?(date: Date): void;
  value?: Date;
};

export const CalendarGridView: FC<CalendarGridViewProps> = ({
  startDate,
  endDate,
  month = new Date().getMonth(),
  renderDate = defaultRenderDate,
  onChange = () => {},
  value = new Date(),
  ...rest
}) => {
  const renderedStartDate = startOfWeek(startDate);
  const renderedEndDate = endOfWeek(endDate);
  const dayCount =
    Math.abs(differenceInDays(renderedEndDate, renderedStartDate)) + 1;

  return (
    <Grid {...rest} rows={Math.ceil(dayCount / 7)}>
      {new Array(dayCount).fill(null).map((_, idx) => {
        const date = addDays(renderedStartDate, idx);
        const isEnabled =
          isWithinRange(date, startDate, endDate) ||
          isSameDay(date, startDate) ||
          isSameDay(date, endDate);
        const title = date.toString();
        const otherMonth = date.getMonth() !== month;
        const selected = isSameDay(date, value);
        return renderDate({
          date,
          otherMonth,
          selected,
          disabled: !isEnabled,
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

const Calendar: FC<CalendarProps> = ({
  value = new Date(),
  startDate,
  endDate,
  ...rest
}) => {
  const month = getMonth(endOfWeek(startDate));

  return (
    <div>
      <MonthContainer>
        <Heading level="4">{MONTH_NAMES[month]}</Heading>
      </MonthContainer>
      <WeekdayRow>
        {new Array(7).fill(null).map((_, idx) => (
          <Label key={`weekday_${idx}`}>{WEEKDAY_ABBREVIATIONS[idx]}</Label>
        ))}
      </WeekdayRow>
      <CalendarGridView
        startDate={startDate}
        endDate={endDate}
        month={month}
        value={value}
        {...rest}
      />
    </div>
  );
};

export const CalendarDay = Day;

export default Calendar;
