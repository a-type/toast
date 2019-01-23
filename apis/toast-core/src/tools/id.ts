import shortid from 'shortid';
import uuid from 'uuid';

export default (name?: string) =>
  name
    ? name.toLowerCase().replace(/\s/g, '-') + '-' + shortid.generate()
    : uuid();
