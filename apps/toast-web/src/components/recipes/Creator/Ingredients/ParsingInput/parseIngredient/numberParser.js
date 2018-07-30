/*
 * Gross, but works?
 */

const denominators = {
  2: [/half/i, /\s?\/\s?2\s/],
  3: [/thirds/i, /third/i, /\s?\/\s?3\s/],
  4: [/fourths/i, /fourth/i, /\s?\/\s?4\s/],
  5: [/fifths/i, /fifth/i, /\s?\/\s?5\s/],
  6: [/sixths/i, /sixth/i, /\s?\/\s?6\s/],
  8: [/eighths/i, /eighth/i, /\s?\/\s?8\s/],
  10: [/tenths/i, /tenth/i, /\s?\/\s?10\s/],
  12: [/twelths/i, /twelth/i, /\s?\/\s?12\s/],
  16: [/sixteenths/i, /sixteenth/i, /\s?\/\s?16\s/],
  32: [/thirty-seconds/i, /thirty-second/i, /\s?\/\s?32\s/],
};

const numerators = {
  1: [/^a\s/i, /one/i, /1/],
  2: [/two/i, /2/],
  3: [/three/i, /3/],
  4: [/four/i, /4/],
  5: [/five/i, /5/],
  6: [/six/i, /6/],
  7: [/seven/i, /7/],
  8: [/eight/i, /8/],
  9: [/nine/i, /9/],
  10: [/ten/i, /10/],
  11: [/eleven/i, /11/],
  12: [/twelve/i, /12/],
  13: [/thirteen/i, /13/],
  14: [/fourteen/i, /14/],
  15: [/fifteen/i, /15/],
  16: [/sixteen/i, /16/],
  17: [/seventeen/i, /17/],
  18: [/eighteen/i, /18/],
  19: [/nineteen/i, /19/],
  20: [/twenty/i, /20/],
  21: [/twenty-one/i, /21/],
  22: [/twenty-two/i, /22/],
  23: [/twenty-three/i, /23/],
  24: [/twenty-four/i, /24/],
  25: [/twenty-five/i, /25/],
  26: [/twenty-six/i, /26/],
  27: [/twenty-seven/i, /27/],
  28: [/twenty-eight/i, /28/],
  29: [/twenty-nine/i, /29/],
  30: [/thirty/i, /30/],
  31: [/thirty-one/i, /31/],
};

export default text => {
  let denominator;
  let denominatorValue = 1;
  const denominatorValues = Object.keys(denominators).reverse();
  for (let index = 0; index < denominatorValues.length; index++) {
    const value = denominatorValues[index];
    const match = denominators[value].find(regex => regex.test(text));
    if (match) {
      denominator = match;
      denominatorValue = value;
      break;
    }
  }

  const textWithoutDenominator = denominator
    ? text.replace(denominator, '')
    : text;

  let numerator;
  let numeratorValue = 1;
  const numeratorValues = Object.keys(numerators).reverse();
  for (let index = 0; index < numeratorValues.length; index++) {
    const value = numeratorValues[index];
    const match = numerators[value].find(regex =>
      regex.test(textWithoutDenominator),
    );
    if (match) {
      numerator = match;
      numeratorValue = value;
    }
  }

  return {
    number: numeratorValue / denominatorValue,
    remainingText: (numerator
      ? textWithoutDenominator.replace(numerator, '')
      : textWithoutDenominator
    ).trim(),
  };
};
