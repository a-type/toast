import { Kind } from 'graphql/language';
import { GraphQLScalarType } from 'graphql';

const parseLiteral = ast => {
  switch (ast.kind) {
    case Kind.BOOLEAN:
    case Kind.STRING:
      return ast.value;
    case Kind.INT:
    case Kind.FLOAT:
      return Number(ast.value);
    case Kind.LIST:
      return ast.values.map(parseLiteral);
    case Kind.OBJECT:
      return ast.fields.reduce((accumulator, field) => {
        accumulator[field.name.value] = parseLiteral(field.value);
        return accumulator;
      }, {});
    case Kind.NULL:
      return null;
    default:
      throw new Error(`Unexpected kind in parseLiteral: ${ast.kind}`);
  }
};

export default new GraphQLScalarType({
  name: 'Any',
  description: 'Any value. No type enforced.',
  parseLiteral,
  parseValue: value => value,
  serialize: value => value,
});
