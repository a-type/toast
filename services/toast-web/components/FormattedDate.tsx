import React, { FC } from 'react';
import { format as doFormat, formatDistanceToNow } from 'date-fns';

export type DateFormat = 'date' | 'dateTime' | 'relative';

export type DateProps = {
  date: string | Date;
  format?: DateFormat;
};

const formatString = (date: string | Date, format: DateFormat) => {
  switch (format) {
    case 'date':
      return doFormat(new Date(date), 'ddd, MMM Do');
    case 'dateTime':
      return doFormat(new Date(date), 'h:mm ddd, MMM Do');
    case 'relative':
      return formatDistanceToNow(new Date(date));
  }
};

export const FormattedDate: FC<DateProps> = ({ date, format = 'date' }) => (
  <span className="date">{formatString(date, format)}</span>
);
