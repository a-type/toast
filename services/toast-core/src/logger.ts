import chalk from 'chalk';
import { ApolloError } from 'apollo-server-core';

const DEBUG = process.env.NODE_ENV !== 'production';

const isApolloError = (err: Error): err is ApolloError =>
  !!err['originalError'];

const keyBlacklist = ['password', 'secret'];
const convert = item => {
  if (item instanceof Error) {
    if (isApolloError(item)) {
      return `${item.name}: ${item.message}
      Path: ${item.path}, Pos: ${item.positions}
      Original Error:
      ${convert(item.originalError)}
      `;
    }

    return `${item.name}: ${item.message}
    ${item.stack}
    `;
  }
  if (typeof item === 'object') {
    return JSON.stringify(
      item,
      (key, val) => (keyBlacklist.includes(key) ? '******' : val),
      '  ',
    );
  } else if (typeof item !== 'string') {
    return JSON.stringify(item);
  }
  return item;
};

export const info = (...items) =>
  console.info(chalk.blue(...items.map(convert)));
info.important = (...items) =>
  console.info(
    chalk.whiteBright.bgBlue.bold('\n', ...items.map(convert), '\n'),
  );

export const warn = (...items) =>
  console.warn(chalk.yellow(...items.map(convert)));
warn.important = (...items) =>
  console.warn(
    chalk.whiteBright.bgYellow.bold('\n', ...items.map(convert), '\n'),
  );

export const fatal = (...items) =>
  console.error(
    chalk.whiteBright.bgRed.bold('\n', ...items.map(convert), '\n'),
  );

export const debug = (...items) => {
  if (DEBUG) {
    console.debug(
      chalk.black.bgWhiteBright.bold('\n', ...items.map(convert), '\n'),
    );
  }
};

export default {
  info,
  warn,
  fatal,
  debug,
};
