import { defaultFieldResolver } from 'graphql';
import { ForbiddenError } from 'apollo-server-express';
import { SchemaDirectiveVisitor } from 'graphql-tools';
import { Context } from 'context';
import { aql } from 'toast-common';
import { UnsubscribedError } from 'errors';
import { isAfter, addWeeks } from 'date-fns';

export default class SubscribedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async (parent, args, ctx: Context, info) => {
      if (!ctx.user) {
        throw new ForbiddenError('Only registered users can do that');
      }

      const groupResult = await ctx.arangoDb.query(aql`
        LET user = DOCUMENT(Users, ${ctx.user.id})
        RETURN FIRST(
          FOR group IN OUTBOUND user MemberOf
            LIMIT 1
            RETURN {
              id: group._key,
              subscriptionExpiresAt: group.subscriptionExpiresAt
            }
        )
      `);

      if (!groupResult.hasNext()) {
        throw new UnsubscribedError();
      }

      const group = await groupResult.next();

      if (!group.subscriptionExpiresAt) {
        throw new UnsubscribedError(false);
      }

      // 1 week grace period
      if (isAfter(new Date(), addWeeks(group.subscriptionExpiresAt, 1))) {
        throw new UnsubscribedError();
      }

      return resolve(parent, args, ctx, info);
    };
  }
}
