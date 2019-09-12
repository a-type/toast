import lookupIngredients from '../services/lookupFoods';
import parser, { ParseResult } from '../services/parser/parser';
import { createFood } from './common';

export default async (req, res) => {
  const { ingredients } = req.body;
  console.info(`Parsing: ${JSON.stringify(ingredients)}`);

  const parsed = ingredients.map(parser) as ParseResult[];

  const foods = await lookupIngredients(parsed.map(p => p.food.normalized));

  foods.forEach(async (food, idx) => {
    if (!food) {
      try {
        foods[idx] = await createFood(parsed[idx].food.normalized);
      } catch (err) {
        // :(
      }
    }
  });

  res.send(
    parsed.map((p, idx) => ({
      ...p,
      food: {
        ...p.food,
        ...(foods[idx] || {}),
      },
    })),
  );
};
