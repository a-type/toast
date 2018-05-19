import { toReadableFraction, formatReadableFraction } from 'readable-fractions';

export const toDisplay = unitValue =>
  formatReadableFraction(toReadableFraction(unitValue));

export const fromDisplay = unitValue => fractionToDecimal(unitValue);
