import shortid from 'shortid';
import uuid from 'uuid';

export default (name?: string) =>
  name
    ? name
        .toLowerCase()
        .split(/\s/)
        .map(s => s.replace(/\W/g, ''))
        .join('-') +
      '-' +
      shortid.generate()
    : uuid();
