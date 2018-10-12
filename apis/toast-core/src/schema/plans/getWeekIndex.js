export default ({ year, month, date, startDay }) => {
  const day = new Date(year, month, date);
  const difference = day - startDay;
  return Math.floor(difference / 604800000);
};
