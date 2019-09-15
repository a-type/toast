import { resolver as arango, builders } from 'graphql-arangodb';
import { Context } from 'context';

export default {
  Mutation: {
    updateFood: arango,
  },
  Query: {
    foods: async (parent, args, ctx: Context, info) => {
      if (args.searchTerm) {
        return arango.runCustomQuery({
          queryBuilder: builders.aqlRelayConnection({
            source: `FOR $node IN FoodSearchView SEARCH
              PHRASE($node.name, $args.searchTerm, 'text_en')
              OR PHRASE($node.alternateNames, $args.searchTerm, 'text_en')
              OR PHRASE($node.searchHelpers, $args.searchTerm, 'text_en')
            `,
            cursorExpression: 'BM25($node)',
            sortOrder: 'ASC',
          }),
          parent,
          args,
          context: ctx,
          info,
        });
      }

      return arango.runCustomQuery({
        queryBuilder: builders.aqlRelayConnection({
          source: `FOR $node IN Foods`,
        }),
        parent,
        args,
        context: ctx,
        info,
      });
    },
  },
  UpdateFoodPayload: {
    food: arango,
  },
};
