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
  ingredient: ParseEntity<string>;
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
};
