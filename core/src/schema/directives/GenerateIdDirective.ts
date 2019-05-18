import { defaultFieldResolver } from 'graphql';
import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { id } from 'tools';
import { pathOr } from 'ramda';

/**
 * If you annotate a field with this, it will generate an 'id' argument
 * based on the type name provided
 */
export default class GenerateIdDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { type, fromArg, argName = 'id' } = this.args;
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async (parent, args, ctx, info) => {
      const idBase = fromArg ? pathOr(null, fromArg.split('.'), args) : type;
      return resolve(parent, { [argName]: id(idBase), ...args }, ctx, info);
    };
  }
}
