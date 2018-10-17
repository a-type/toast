export default ({ year, month, date, startDay }) => {
  if (!year || !month || !date || !startDay) {
    throw new Error('All parameters are required');
  }

  const day = new Date(year, month, date);
  const difference = day - startDay;
  return Math.floor(difference / 604800000);
};
