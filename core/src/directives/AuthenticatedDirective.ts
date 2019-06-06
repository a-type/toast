import { defaultFieldResolver } from 'graphql';
import { ForbiddenError } from 'apollo-server-express';
import { SchemaDirectiveVisitor } from 'graphql-tools';

export default class AuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = (parent, args, ctx, info) => {
      if (!ctx.user) {
        throw new ForbiddenError('Only registered users can to do that');
      }
      return resolve(parent, args, ctx, info);
    };
  }
}
