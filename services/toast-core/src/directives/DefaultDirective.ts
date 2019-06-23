import { defaultFieldResolver } from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';
import { id } from 'tools';
import { pathOr } from 'ramda';

/**
 * If you annotate a field with this, it will generate an 'id' argument
 * based on the type name provided
 */
export default class GenerateIdDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { value = null } = this.args;
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async (parent, args, ctx, info) => {
      const returned = await resolve(parent, args, ctx, info);
      return returned === null ? value : returned;
    };
  }
}
