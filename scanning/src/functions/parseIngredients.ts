import parser, { ParseResult } from '../services/parser/parser';
import lookupIngredients from '../services/lookupIngredients';
import neo4j from '../services/neo4j';

export default async (req, res) => {
  const { ingredients } = req.body;
  console.info(`Parsing: ${JSON.stringify(ingredients)}`);

  const parsed = ingredients.map(parser) as ParseResult[];

  const session = neo4j.session();
  const found = await lookupIngredients(
    session,
    parsed.map(p => p.food.normalized),
  );

  res.send(
    parsed.map((p, idx) => ({
      ...p,
      food: {
        ...p.food,
        ...(found[idx] || {}),
      },
    })),
  );
};
