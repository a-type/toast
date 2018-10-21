import { format, isToday, isTomorrow } from 'date-fns';

export const formatDay = (dateStr: string) => {
  const date = new Date(dateStr);
  if (isToday(date)) {
    return 'Today';
  } else if (isTomorrow(date)) {
    return 'Tomorrow';
  }
  return format(date, 'dddd, MMM Do');
};
