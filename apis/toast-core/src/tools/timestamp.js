import { v1 } from 'neo4j-driver';

export default (date = new Date()) =>
  new v1.types.DateTime(
    date.getFullYear(),
    date.getMonth(),
    date.getDay(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds() * 1000000,
    date.getTimezoneOffset() * 60,
  );
