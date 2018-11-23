import convert from 'convert-units';

export interface Quantity {
  value: number;
  unit: string;
}

const lookupUnit = (unitName: string): string => {
  if (!unitName) {
    return null;
  }
  const units = convert().list();
  const match = units.find(
    ({ abbr, singular }) =>
      unitName.toLowerCase() === abbr ||
      unitName.toLowerCase() === singular.toLowerCase(),
  );
  return (match && match.abbr) || null;
};

export const addQuantities = (qty1: Quantity, qty2: Quantity) => {
  if (qty2.value === 0) {
    return qty1;
  } else if (qty1.value === 0) {
    return qty2;
  }

  const baseUnit = lookupUnit(qty1.unit);
  const addUnit = lookupUnit(qty2.unit);

  if (!baseUnit && !addUnit) {
    if (qty1.unit === qty2.unit) {
      return {
        value: qty1.value + qty2.value,
        unit: qty1.unit,
      };
    }

    throw new Error(
      `Two unknown quantities were added which may not be compatible ${
        qty1.value
      } ${qty1.unit}, ${qty2.value} ${qty2.unit}`,
    );
  }

  if (
    !addUnit ||
    !baseUnit ||
    !convert()
      .from(addUnit)
      .possibilities()
      .includes(baseUnit) ||
    !convert()
      .from(baseUnit)
      .possibilities()
      .includes(addUnit)
  ) {
    throw new Error(
      `Quantities are not compatible ${qty1.value} ${qty1.unit}, ${
        qty2.value
      } ${qty2.unit}`,
    ); // TODO: split out into 2 items
  }

  const convertedAddValue = convert(qty2.value)
    .from(addUnit)
    .to(baseUnit);
  return {
    value: qty1.value + convertedAddValue,
    unit: baseUnit,
  };
};

export const subtractQuantities = (qty1: Quantity, qty2: Quantity) => {
  return addQuantities(qty1, {
    value: -(qty2.value || 0),
    unit: qty2.unit,
  });
};
