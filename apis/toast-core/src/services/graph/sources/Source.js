import { pick, omit } from 'ramda';
import { NotFoundError } from 'errors';

export default class Source {
  constructor(ctx, graph, resourceName, fields) {
    this.ctx = ctx;
    this.graph = graph;
    this.fields = fields;
    this.resourceName = resourceName;
    this.dbFields = fields.map(name => `.${name}`).join(', ');
  }

  filterInputFields = data => omit(['id'], pick(this.fields, data));

  hydrateOne = (
    result,
    { key = this.resourceName.toLowerCase(), throwIfNone = false } = {},
  ) => {
    if (!result.records.length) {
      if (throwIfNone) {
        throw new NotFoundError(this.resourceName);
      }
      return null;
    }
    return result.records[0].get(key);
  };

  hydrateList = (
    result,
    { key = this.resourceName.toLowerCase(), throwIfNone = false } = {},
  ) => {
    if (!result.records.length) {
      if (throwIfNone) {
        throw new NotFoundError(this.resourceName);
      }
      return [];
    }
    return result.records.map(rec => rec.get(key));
  };
}
