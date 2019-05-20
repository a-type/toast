import parser from 'ingredients-parser';
import getNumber from './getNumber';
import depluralize from './depluralize';
import lowercase from './lowercase';
import getRange from './getRange';
import sanitize from './sanitize';
import unabbreviate from './unabbreviate';
import removePreparations from './removePreparations';
import removeComments from './removeComments';
import { replaceUnicodeFractions } from './unicodeFractions';

export interface ParseEntity<T> {
  raw: string;
  normalized: T;
  range: [number, number] | [];
}

export interface ParseResult {
  original: string;
  sanitized: string;
  ingredient: ParseEntity<string>;
  unit: ParseEntity<string>;
  quantity: ParseEntity<number>;
  preparations: string[];
  comments: string[];
}

export default (text: string): ParseResult => {
  const sanitized = replaceUnicodeFractions(sanitize(text));
  const { text: withoutPreparations, preparations } = removePreparations(
    sanitized,
  );
  const { text: withoutComments, comments } = removeComments(
    withoutPreparations,
  );

  const parsed = parser.parse(withoutComments);

  const unitRaw = (parsed.unit || '').trim();

  const unitNormalized = unabbreviate(depluralize(lowercase(unitRaw)));

  const quantityRaw = (parsed.amount || '').trim();

  const quantityNormalized = getNumber(quantityRaw);

  const ingredientRaw = (parsed.ingredient || '').trim();

  const ingredientNormalized = depluralize(lowercase(ingredientRaw));

  return {
    original: text,
    sanitized,
    ingredient: {
      raw: ingredientRaw || null,
      normalized: ingredientNormalized || null,
      range: getRange(sanitized, ingredientRaw),
    },
    unit: {
      raw: unitRaw || null,
      normalized: unitNormalized || null,
      range: getRange(sanitized, unitRaw),
    },
    quantity: {
      raw: quantityRaw || null,
      normalized: quantityNormalized || null,
      range: getRange(sanitized, quantityRaw),
    },
    preparations,
    comments,
  };
};
