import { pick, omit } from 'ramda';
import { NotFoundError } from 'errors';
import { GraphContext } from '../types';

export default class Source<T> {
  ctx: GraphContext;
  graph: any;
  fields: string[];
  resourceName: string;
  dbFields: string;

  constructor(
    ctx: GraphContext,
    graph: any,
    resourceName: string,
    fields: string[],
  ) {
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
  ): T => {
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
  ): T[] => {
    if (!result.records.length) {
      if (throwIfNone) {
        throw new NotFoundError(this.resourceName);
      }
      return [];
    }
    return result.records.map(rec => rec.get(key));
  };
}
