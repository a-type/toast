import { getDay, addDays, startOfDay, format } from 'date-fns';

const FORMAT = 'YYYYMMDD[T]000000';

const nextDay = (day: number) => {
  const today = getDay(new Date());
  if (today < day) {
    return startOfDay(addDays(new Date(), today - day));
  }
  return startOfDay(addDays(new Date(), 7 + (today - day)));
};

export default (day: number) => {
  const startDate = nextDay(day);
  const endDate = addDays(startDate, 1);

  const startDateString = format(startDate, FORMAT);
  const endDateString = format(endDate, FORMAT);
  const finalDateString = '21500101T000000';
  const uid = `toast-${Math.random()}`;
  const link = 'https://toastcooking.app/shoppingList';

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//TOAST COOKING//TOAST APP//EN',
    'BEGIN:VEVENT',
    'SUMMARY:Grocery Day',
    `DTSTART:${startDateString}`,
    `DTEND:${endDateString}`,
    `DTSTAMP:${startDateString}`,
    `RRULE:FREQ=WEEKLY;UNTIL=${finalDateString};`,
    `UID:${uid}`,
    `DESCRIPTION:${link}`,
    `URL:${link}`,
    `END:VEVENT`,
    `END:VCALENDAR`,
  ].join('\r\n');
};
