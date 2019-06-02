import config from 'config';
import fetch from 'node-fetch';

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
  ingredient: ParseEntity<string> & {
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
    const response = await fetch(config.scanning.host + '/linkRecipe', {
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
    const response = await fetch(config.scanning.host + '/parseIngredients', {
      method: 'POST',
      body: JSON.stringify({
        ingredients,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

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
    ingredientStart: parsed.ingredient && parsed.ingredient.range[0],
    ingredientEnd: parsed.ingredient && parsed.ingredient.range[1],
    comments: parsed.comments,
    preparations: parsed.preparations,
    ingredientId: parsed.ingredient && parsed.ingredient.id,
  }),
};
