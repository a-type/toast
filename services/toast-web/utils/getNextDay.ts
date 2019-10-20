import { setDay, isBefore, addWeeks } from 'date-fns';

export default (date: Date, dayIndex: number) => {
  const naive = setDay(date, dayIndex);
  if (isBefore(naive, date)) {
    return addWeeks(naive, 1);
  }
  return naive;
};
