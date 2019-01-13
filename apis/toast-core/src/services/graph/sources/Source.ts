import { pick, omit, mergeWith, defaultTo } from 'ramda';
import { NotFoundError } from 'errors';
import { GraphContext } from '../types';
import { camel } from 'change-case';

export default class Source<T extends {}> {
  ctx: GraphContext;
  graph: any;
  fields: string[];
  resourceName: string;
  dbFields: string;
  defaults?: Partial<T>;

  constructor(
    ctx: GraphContext,
    graph: any,
    resourceName: string,
    fields: string[],
    defaults?: Partial<T>,
  ) {
    this.ctx = ctx;
    this.graph = graph;
    this.fields = fields;
    this.resourceName = resourceName;
    this.dbFields = fields.map(name => `.${name}`).join(', ');
    this.defaults = defaults;
  }

  filterInputFields = data => omit(['id'], pick(this.fields, data));

  applyDefaults = (item: T): T => {
    if (this.defaults) {
      return mergeWith(defaultTo, this.defaults, item);
    }
    return item;
  };

  hydrateOne = (
    result,
    { key = camel(this.resourceName), throwIfNone = false } = {},
  ): T => {
    if (!result.records.length) {
      if (throwIfNone) {
        throw new NotFoundError(this.resourceName);
      }
      return null;
    }
    return this.applyDefaults(result.records[0].get(key));
  };

  hydrateList = (
    result,
    { key = camel(this.resourceName), throwIfNone = false } = {},
  ): T[] => {
    if (!result.records.length) {
      if (throwIfNone) {
        throw new NotFoundError(this.resourceName);
      }
      return [];
    }
    return result.records.map(rec => this.applyDefaults(rec.get(key)));
  };
}
