import nlp from 'compromise';
import plug from 'compromise-plugin';

const plugin = {
  name: 'ingredients-plugin',
  tags: {
    Ingredient: {
      isA: 'Noun',
    },
  },
  words: {
    pinch: 'Unit',
    can: 'Unit',
    box: 'Unit',
    ear: 'Unit',
    head: 'Unit',

    garlic: 'Ingredient',
  },
  patterns: {
    '#Noun': 'Ingredient',
    '#Adjective? #Noun': 'Ingredient',
    '#Adverb? #Verb #Noun': 'Ingredient',
  },
};

nlp.plugin(plug.pack(plugin));

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

export default text => {
  const withoutExtras = text.replace(/\(.*\)/g, '');
  const doc = nlp(withoutExtras);

  const unit = doc
    .clone()
    .match(`#Unit`)
    .get(0);

  const unitRaw = unit.out('text').trim();

  const unitNormalized = unabbreviate(
    unit
      .normalize({ plurals: true, case: true })
      .out('text')
      .trim()
      .toLowerCase(),
  ).replace('slouse', 'slice'); // kinda funny error.

  const value = doc
    .clone()
    .match('#Value')
    .get(0);

  const valueRaw = value.out('text');

  const valueNormalized = value.values().numbers()[0];

  const ingredient = doc
    .clone()
    .not('#Unit')
    .not('#Value')
    .match('#Ingredient');

  const ingredientRaw = ingredient.out('text').trim();

  const ingredientNormalized = ingredient
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
  };
};
