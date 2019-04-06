import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { format, parse } from 'date-fns';
import { v1 } from 'neo4j-driver';

export default new GraphQLScalarType({
  name: 'Date',
  description: 'A Date value. For use in inputs, send the getTime() value.',
  parseValue: value => {
    if (typeof value === 'number') {
      return new Date(value);
    } else {
      return parse(value);
    }
  },
  serialize: (value: v1.Date) => {
    const date = new Date(
      (value.year as any) as number,
      ((value.month as any) as number) - 1,
      (value.day as any) as number,
      0,
      0,
      0,
      0,
    );
    return format(date, 'YYYY-MM-DD');
  },
  parseLiteral: ast => {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    } else if (ast.kind === Kind.STRING) {
      return parse(ast.value);
    }
    return null;
  },
});
