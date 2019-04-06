import {
  toReadableFraction,
  formatReadableFraction,
  fractionToDecimal,
} from 'readable-fractions';

export const toDisplay = (unitValue: number): string =>
  formatReadableFraction(toReadableFraction(unitValue));

export const fromDisplay = (unitValue: string): number =>
  fractionToDecimal(unitValue);
