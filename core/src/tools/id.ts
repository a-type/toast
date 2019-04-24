import shortid from 'shortid';
import uuid from 'uuid';

export default (name?: string) =>
  name
    ? name
        .slice(0, 24)
        .toLowerCase()
        .split(/\s/)
        .map(s => s.replace(/\W/g, ''))
        .join('-') +
      '-' +
      shortid.generate()
    : uuid();
