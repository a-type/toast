import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

export default new GraphQLScalarType({
  name: 'Date',
  description: 'A Date value. For use in inputs, send the getTime() value.',
  parseValue: value => {
    return new Date(value);
  },
  serialize: value => {
    return value.getTime();
  },
  parseLiteral: ast => {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  },
});
