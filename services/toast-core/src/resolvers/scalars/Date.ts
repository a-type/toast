import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { format, parse } from 'date-fns';

export default new GraphQLScalarType({
  name: 'Date',
  description: 'A Date value. For use in inputs, send the getTime() value.',
  parseValue: value => {
    if (typeof value === 'number') {
      return value;
    } else {
      return parse(value).getTime();
    }
  },
  serialize: (value: number | Date | string) => {
    if (typeof value === 'number') {
      return value;
    } else {
      return parse(value).getTime();
    }
  },
  parseLiteral: ast => {
    if (ast.kind === Kind.INT) {
      return ast.value;
    } else if (ast.kind === Kind.STRING) {
      return parse(ast.value).getTime();
    }
    return null;
  },
});
