import { defaultFieldResolver } from 'graphql';
import {
  ForbiddenError,
  AuthenticationError,
  SchemaDirectiveVisitor,
} from 'apollo-server-express';

export default class HasClaimDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = (parent, args, ctx, info) => {
      if (!ctx.user) {
        throw new AuthenticationError('You have to be logged in to do that');
      }
      if (!ctx.user[this.args.claim]) {
        throw new ForbiddenError("You don't have permission to do that");
      }
      return resolve(parent, args, ctx, info);
    };
  }
}
