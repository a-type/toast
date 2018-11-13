export default ({
  year,
  month,
  date,
  startDay,
}: {
  year: number;
  month: number;
  date: number;
  startDay: Date;
}) => {
  if (!year || !month || !date || !startDay) {
    throw new Error('All parameters are required');
  }

  const day = new Date(year, month, date);
  const difference = day.valueOf() - startDay.valueOf();
  return Math.floor(difference / 604800000);
};
