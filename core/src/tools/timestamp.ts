import { v1 } from 'neo4j-driver';

export default (date = new Date()) =>
  new (v1.types.DateTime as any)(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDay() + 1,
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds() * 1000000,
    date.getTimezoneOffset() * 60,
  ) as any;
