import { differenceInDays, startOfDay, addDays } from 'date-fns';
import { START_WEEK_DAY } from '../constants';

export const getDateIndex = (date: Date) =>
  differenceInDays(date, START_WEEK_DAY);

export const getDate = (dateIndex: number) =>
  startOfDay(addDays(START_WEEK_DAY, dateIndex));
