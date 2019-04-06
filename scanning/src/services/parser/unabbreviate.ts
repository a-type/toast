const abbreviations = {
  tsp: 'teaspoon',
  tbsp: 'tablespoon',
  c: 'cup',
  gal: 'gallon',
  g: 'gram',
  lb: 'pound',
};

export default (input: string) => {
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
