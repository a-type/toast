import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

export default new GraphQLScalarType({
  name: 'WeekDay',
  description: 'A week day index, 0-6',
  parseValue(value) {
    return value;
  },
  serialize(value) {
    return value;
  },
  parseLiteral: ast => {
    if (ast.kind === Kind.INT) {
      return ast.value;
    }
    return null;
  },
});
