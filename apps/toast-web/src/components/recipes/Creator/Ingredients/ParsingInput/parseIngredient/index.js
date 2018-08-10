import nlp from 'compromise';
import plug from 'compromise-plugin';

const plugin = {
  name: 'ingredients-plugin',
  tags: {
    Ingredient: {
      isA: 'Noun',
    },
  },
  patterns: {
    '#Noun': 'Ingredient',
    '#Adjective? #Noun': 'Ingredient',
    '#Adverb? #Verb #Noun': 'Ingredient',
  },
};

nlp.plugin(plug.pack(plugin));

export default text => {
  const doc = nlp(text);

  const unit = doc
    .clone()
    .match(`#Unit`)
    .get(0);

  const unitRaw = unit.out('text').trim();

  const unitNormalized = unit
    .normalize({ plurals: true })
    .out('text')
    .trim();

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
    .normalize({ plurals: true })
    .out('text')
    .trim();

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
