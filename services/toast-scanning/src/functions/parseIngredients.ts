import lookupIngredients from '../services/lookupFoods';
import parser, { ParseResult } from '../services/parser/parser';
import { createFood } from './common';
import { logger } from 'toast-common';

export default async (req, res) => {
  const { ingredients } = req.body;
  logger.info(`Parsing: ${JSON.stringify(ingredients)}`);

  const parsed = ingredients.map(parser) as ParseResult[];

  const foods = await lookupIngredients(parsed.map(p => p.food.normalized));

  for (let idx = 0; idx < foods.length; idx++) {
    const food = foods[idx];
    const parsedItem = parsed[idx];
    if (!food) {
      logger.info(
        `No suitable food found for: "${parsedItem.food.normalized}"`,
      );
      try {
        foods[idx] = await createFood(parsedItem.food.normalized);
      } catch (err) {
        // :(
        logger.fatal(err);
      }
    }
  }

  const finalParsedItems = parsed.map((p, idx) => ({
    ...p,
    food: {
      ...p.food,
      ...(foods[idx] || {}),
    },
  }));

  logger.debug(finalParsedItems);

  res.send(finalParsedItems);
};
