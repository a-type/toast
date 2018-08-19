import { SchemaDirectiveVisitor } from 'graphql-tools';
import { defaultFieldResolver } from 'graphql';
import { path } from 'ramda';

export default class RelatedToUserDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const {
      relationName = 'AUTHOR_OF',
      labelName = 'Recipe',
      idArg = 'id'
    } = this.args;
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async (parent, queryArgs, ctx, info) => {
      const result = await ctx.tx.run(
        `MATCH (n:${labelName} { id: $id })<-[:${relationName}]-(:User { id: $userId }) RETURN n { .id }`,
        {
          id: path(idArg.split('.'))(queryArgs),
          userId: ctx.user.id
        }
      );
      if (result.records.length === 0) {
        throw new Error("Sorry, you can't do that");
      }
      return resolve(parent, queryArgs, ctx, info);
    };
  }
}
