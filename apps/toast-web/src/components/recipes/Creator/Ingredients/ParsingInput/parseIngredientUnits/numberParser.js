/*
 * Gross, but works?
 */

const denominators = {
  2: [/half(\s|$)/i, /\s?\/\s?2(\s|$)/],
  3: [/thirds?(\s|$)/i, /\s?\/\s?3(\s|$)/],
  4: [/fourths?(\s|$)/i, /\s?\/\s?4(\s|$)/],
  5: [/fifths?(\s|$)/i, /\s?\/\s?5(\s|$)/],
  6: [/sixths?(\s|$)/i, /\s?\/\s?6(\s|$)/],
  8: [/eighths?(\s|$)/i, /\s?\/\s?8(\s|$)/],
  10: [/tenths?(\s|$)/i, /\s?\/\s?10(\s|$)/],
  12: [/twelths?(\s|$)/i, /\s?\/\s?12(\s|$)/],
  16: [/sixteenths?(\s|$)/i, /\s?\/\s?16(\s|$)/],
  32: [/thirty-seconds?(\s|$)/i, /thirty-second(\s|$)/i, /\s?\/\s?32(\s|$)/],
};

const numerators = {
  1: [/^a(\s|$)/i, /one(\s|$)/i, /1/],
  2: [/two(\s|$)/i, /2/],
  3: [/three(\s|$)/i, /3/],
  4: [/four(\s|$)/i, /4/],
  5: [/five(\s|$)/i, /5/],
  6: [/six(\s|$)/i, /6/],
  7: [/seven(\s|$)/i, /7/],
  8: [/eight(\s|$)/i, /8/],
  9: [/nine(\s|$)/i, /9/],
  10: [/ten(\s|$)/i, /10/],
  11: [/eleven(\s|$)/i, /11/],
  12: [/twelve(\s|$)/i, /12/],
  13: [/thirteen(\s|$)/i, /13/],
  14: [/fourteen(\s|$)/i, /14/],
  15: [/fifteen(\s|$)/i, /15/],
  16: [/sixteen(\s|$)/i, /16/],
  17: [/seventeen(\s|$)/i, /17/],
  18: [/eighteen(\s|$)/i, /18/],
  19: [/nineteen(\s|$)/i, /19/],
  20: [/twenty(\s|$)/i, /20/],
  21: [/twenty-one(\s|$)/i, /21/],
  22: [/twenty-two(\s|$)/i, /22/],
  23: [/twenty-three(\s|$)/i, /23/],
  24: [/twenty-four(\s|$)/i, /24/],
  25: [/twenty-five(\s|$)/i, /25/],
  26: [/twenty-six(\s|$)/i, /26/],
  27: [/twenty-seven(\s|$)/i, /27/],
  28: [/twenty-eight(\s|$)/i, /28/],
  29: [/twenty-nine(\s|$)/i, /29/],
  30: [/thirty(\s|$)/i, /30/],
  31: [/thirty-one(\s|$)/i, /31/],
};

const fraction = /(\d+\.\d+)/;

export default text => {
  // first... scan for fraction
  const fractionResult = fraction.exec(text);
  if (fractionResult) {
    return {
      number: parseFloat(fractionResult[1]),
      remainingText: text.replace(fraction, '').trim(),
    };
  }

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
    number: numerator ? numeratorValue / denominatorValue : null,
    remainingText: (numerator
      ? textWithoutDenominator.replace(numerator, '')
      : textWithoutDenominator
    ).trim(),
  };
};
