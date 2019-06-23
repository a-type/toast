import config from 'config';
import { invokeCloudRun } from 'services/common';

export type LinkResult = {
  recipeId: string;
  problems: string[];
};

export interface ParseEntity<T> {
  raw: string;
  normalized: T;
  range: [number, number] | [];
}

export type IngredientParseResult = {
  original: string;
  sanitized: string;
  food: ParseEntity<string> & {
    id?: string;
    name?: string;
  };
  unit: ParseEntity<string>;
  quantity: ParseEntity<number>;
  preparations: string[];
  comments: string[];
};

export default {
  linkRecipe: async (
    sourceUrl: string,
    userId: string,
  ): Promise<LinkResult> => {
    const response = await invokeCloudRun(config.scanning.host, '/linkRecipe', {
      method: 'POST',
      body: JSON.stringify({
        sourceUrl,
        userId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const body = await response.json();
    return body;
  },

  parseIngredients: async (
    ingredients: string[],
  ): Promise<IngredientParseResult[]> => {
    const response = await invokeCloudRun(
      config.scanning.host,
      '/parseIngredients',
      {
        method: 'POST',
        body: JSON.stringify({
          ingredients,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const body = await response.json();
    return body;
  },

  parsedIngredientToRecipeIngredient: (parsed: IngredientParseResult) => ({
    text: parsed.sanitized || parsed.original,
    unit: parsed.unit && parsed.unit.normalized,
    unitStart: parsed.unit && parsed.unit.range[0],
    unitEnd: parsed.unit && parsed.unit.range[1],
    quantity: parsed.quantity && parsed.quantity.normalized,
    quantityStart: parsed.quantity && parsed.quantity.range[0],
    quantityEnd: parsed.quantity && parsed.quantity.range[1],
    foodStart: parsed.food && parsed.food.range[0],
    foodEnd: parsed.food && parsed.food.range[1],
    comments: parsed.comments,
    preparations: parsed.preparations,
    foodId: parsed.food && parsed.food.id,
  }),
};
