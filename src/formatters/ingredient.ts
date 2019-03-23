import { toDisplay } from './quantity';
import pluralize from 'pluralize';

export default (value: number, unit: string, rest: string): string => {
  if (value === 1) {
    return `${toDisplay(value)} ${unit} ${rest}`;
  }
  return `${toDisplay(value)} ${pluralize(unit)} ${rest}`;
};
