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

export interface DateProps {
  title: string;
  value: number;
  onClick(): void;
  disabled: boolean;
}

export type CalendarProps = React.HTMLAttributes<HTMLDivElement> & {
  value: Date;
  onChange(date: Date): void;
  renderDate?: ({ date: Date, props: DateProps }) => React.ReactNode;
};

const defaultRenderDate = ({
  date,
  props,
}: {
  date: Date;
  props: DateProps;
}) => <Day {...props}>{getDate(date)}</Day>;

const Calendar: React.SFC<CalendarProps> = ({
  value,
  onChange,
  renderDate = defaultRenderDate,
  ...rest
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const toggleExpanded = () => setExpanded(current => !current);
  const [internalStartDate, setStartDate] = React.useState(
    startOfWeek(new Date()),
  );
  const dayCount = expanded ? 35 : 14;
  const month = getMonth(internalStartDate);

  const startDate = expanded
    ? startOfWeek(startOfMonth(internalStartDate))
    : internalStartDate;

  const nextMonth = () =>
    setStartDate(addMonths(startOfMonth(internalStartDate), 1));
  const previousMonth = () =>
    setStartDate(addMonths(startOfMonth(internalStartDate), -1));

  return (
    <div>
      <CrossFade>
        {expanded ? (
          <MonthContainer>
            <Button.Icon
              name="expand-arrow"
              iconProps={{ rotation: 90 }}
              onClick={previousMonth}
            />
            <H3>{MONTH_NAMES[month]}</H3>
            <Button.Icon
              name="expand-arrow"
              iconProps={{ rotation: 270 }}
              onClick={nextMonth}
            />
          </MonthContainer>
        ) : null}
      </CrossFade>
      <Grid {...rest} rows={expanded ? 5 : 2}>
        {new Array(dayCount).fill(null).map((_, idx) => {
          const date = addDays(startDate, idx);
          const title = date.toString();
          return renderDate({
            date,
            props: {
              value: date.getDate(),
              title,
              onClick: () => onChange(date),
            },
          });
        })}
      </Grid>
      <ExpandButton onClick={toggleExpanded} expanded={expanded} />
    </div>
  );
};

export default cold(Calendar);
