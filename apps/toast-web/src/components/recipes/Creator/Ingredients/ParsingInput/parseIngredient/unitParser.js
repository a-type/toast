const units = {
  // weight
  ounce: [/ounces?\s/i, /ozs?/i],
  pound: [/pounds?\s/i, /lbs?/i],
  gram: [/grams?\s/i, /gs?\s/i],
  kilogram: [/kilograms?\s/i, /kgs?\s/i],

  // volume
  pinch: [/pinches\s/i, /pinch\s/i],
  dash: [/dashes\s/i, /dash\s/i],
  teaspoon: [/teaspoons?\s/i, /tsps?\s/i],
  tablespoon: [/tablespoons?\s/i, /tbsps?\s/i],
  cup: [/cups?\s/i, /cp?s?\s/i],
  pint: [/pints?\s/i, /pts?\s/i],
  quart: [/quarts?\s/i, /qts?\s/i],
  milliliter: [/milliliters?\s/i, /mililiters?\s/i, /mls?\s/i],
  liter: [/liters?\s/i, /ls?\s/i],
  gallon: [/gallons?\s/i, /gals?\s/i, /gs?\s/i],

  // containers
  can: [/cans?\s/i],
  box: [/box\s/i, /boxes\s/i],
  tube: [/tubes?\s/i],

  // foods
  slice: [/slices?\s/i],
};

export default text => {
  const unitTypes = Object.keys(units).reverse();
  for (let i = 0; i < unitTypes.length; i++) {
    const type = unitTypes[i];

    const match = type.find(regex => regex.test(text));
    if (match) {
      return {
        unit: type,
        remainingText: text.replace(match, ''),
      };
    }
  }

  return {
    unit: null,
    remainingText: text,
  };
};
