import nlp from 'compromise';
import parser from 'ingredients-parser';

const abbreviations = {
  tsp: 'teaspoon',
  tbsp: 'tablespoon',
  c: 'cup',
  gal: 'gallon',
  g: 'gram',
  lb: 'pound',
};

const unabbreviate = input => {
  const matches = Object.keys(abbreviations).sort(
    (a, b) => a.length - b.length,
  );
  for (var i = 0; i < matches.length; i++) {
    if (matches[i] === input) {
      return abbreviations[matches[i]];
    }
  }
  return input;
};

const removeAsides = text =>
  text
    .replace(/\(.*\)/g, '')
    .replace(/,.*$/, '')
    .replace(/optional/, '');
const removeWeirdCharacters = text => text.replace(/[\*&:]/g, '');
const isOptional = text => /optional/.test(text);

export default text => {
  const withoutExtras = removeWeirdCharacters(removeAsides(text));
  const parsed = parser.parse(withoutExtras);

  const doc = (nlp as any)(withoutExtras);

  const unitRaw = parsed.unit;

  const unitNormalized = unabbreviate(
    (nlp as any)(unitRaw)
      .normalize({ plurals: true, case: true })
      .out('text')
      .trim()
      .toLowerCase(),
  ).replace('slouse', 'slice'); // kinda funny error.

  const valueRaw = parsed.amount;

  const valueNormalized = (nlp as any)(valueRaw)
    .values()
    .numbers()[0];

  const ingredientRaw = parsed.ingredient;

  const ingredientNormalized = (nlp as any)(ingredientRaw)
    .normalize({ plurals: true, case: true })
    .out('text')
    .trim()
    .toLowerCase();

  return {
    ingredient: {
      raw: ingredientRaw || null,
      normalized: ingredientNormalized || null,
    },
    unit: {
      raw: unitRaw || null,
      normalized: unitNormalized || null,
    },
    value: {
      raw: valueRaw || null,
      normalized: valueNormalized || null,
    },
    optional: isOptional(text),
  };
};
