import config from 'config';
import fetch from 'node-fetch';
import logger from 'logger';

const endpoint = config.ingredientParser.endpoint;
const authorization = `Bearer ${config.ingredientParser.secret}`;

export type TextRange = [number, number];

export type IngredientParseResult = {
  original: string;
  comments: string[];
  preparations: string[];
  ingredient: {
    raw: string;
    normalized: string;
    range: TextRange;
  };
  unit: {
    raw: string;
    normalized: string;
    range: TextRange;
  };
  value: {
    raw: string;
    normalized: number;
    range: TextRange;
  };
};

export default {
  parse: async (
    ingredientStrings: string[],
  ): Promise<IngredientParseResult[]> => {
    if (!ingredientStrings.length) {
      return [];
    }
    let response;
    try {
      response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({
          ingredients: ingredientStrings,
        }),
        headers: {
          authorization,
          'content-type': 'application/json',
        },
      });

      const body = await response.json();

      return body;
    } catch (err) {
      logger.fatal(err);
      if (response) {
        logger.debug(response);
      }
      throw err;
    }
  },

  toRecipeIngredient: (parsed: IngredientParseResult, ingredientId: string) => {
    const getOrNull = (range: [number, number], index: number): number =>
      range[index] !== undefined ? range[index] : null;

    return {
      unit: parsed.unit.normalized,
      unitStart: getOrNull(parsed.unit.range, 0),
      unitEnd: getOrNull(parsed.unit.range, 1),
      value: parsed.value.normalized,
      valueStart: getOrNull(parsed.value.range, 0),
      valueEnd: getOrNull(parsed.value.range, 1),
      ingredientStart: getOrNull(parsed.ingredient.range, 0),
      ingredientEnd: getOrNull(parsed.ingredient.range, 1),
      text: parsed.original,
      ingredientId,
    };
  },
};
