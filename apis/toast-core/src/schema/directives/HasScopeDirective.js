import { SchemaDirectiveVisitor } from 'graphql-tools';
import { defaultFieldResolver } from 'graphql';
import { ForbiddenError, AuthenticationError } from 'apollo-server-express';

export default class HasScopeDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = (parent, args, ctx, info) => {
      if (!ctx.user) {
        throw new AuthenticationError('You have to be logged in to do that');
      }
      if (!ctx.scopes.includes(this.args.scope)) {
        throw new ForbiddenError("You don't have permission to do that");
      }
      return resolve(parent, args, ctx, info);
    };
  }
}
