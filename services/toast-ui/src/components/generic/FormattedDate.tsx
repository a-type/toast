import React, { FC } from 'react';
import { format as doFormat, distanceInWordsToNow } from 'date-fns';

export type DateFormat = 'date' | 'dateTime' | 'relative';

export type DateProps = {
  date: string | Date;
  format?: DateFormat;
};

const formatString = (date: string | Date, format: DateFormat) => {
  switch (format) {
    case 'date':
      return doFormat(date, 'ddd, MMM Do');
    case 'dateTime':
      return doFormat(date, 'h:mm ddd, MMM Do');
    case 'relative':
      return distanceInWordsToNow(date);
  }
};

export const FormattedDate: FC<DateProps> = ({ date, format = 'date' }) => (
  <span className="date">{formatString(date, format)}</span>
);
