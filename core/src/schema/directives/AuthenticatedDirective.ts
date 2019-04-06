import { defaultFieldResolver } from 'graphql';
import { ForbiddenError, SchemaDirectiveVisitor } from 'apollo-server-express';

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
