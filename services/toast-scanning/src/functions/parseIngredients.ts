import lookupIngredients from '../services/lookupFoods';
import parser, { ParseResult } from '../services/parser/parser';

export default async (req, res) => {
  const { ingredients } = req.body;
  console.info(`Parsing: ${JSON.stringify(ingredients)}`);

  const parsed = ingredients.map(parser) as ParseResult[];

  const found = await lookupIngredients(parsed.map(p => p.food.normalized));

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
