import { addDays, addWeeks } from 'date-fns';

export default ({ weekIndex, startDay, dayOffset = 0 }) => {
  const date = new Date(startDay.valueOf());
  return addDays(addWeeks(date, weekIndex), dayOffset);
};
