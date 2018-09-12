import { SchemaDirectiveVisitor } from 'graphql-tools';
import { defaultFieldResolver } from 'graphql';
import { ForbiddenError } from 'apollo-server-express';

export default class HasRoleDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = (parent, args, ctx, info) => {
      if (!ctx.user || !ctx.roles.includes(this.args.role)) {
        throw new ForbiddenError("Sorry, you can't do that");
      }
      return resolve(parent, args, ctx, info);
    };
  }
}
