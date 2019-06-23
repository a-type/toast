import convert from 'convert-units';

export interface Quantity {
  value: number;
  unit: string;
}

export const lookupUnit = (unitName: string): string => {
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

export const convertQuantity = (qty: Quantity, toUnit: string) => {
  if (qty.value === 0 || qty.unit === toUnit) {
    return {
      value: qty.value,
      unit: toUnit,
    };
  }

  const baseUnit = lookupUnit(qty.unit);
  const convertUnit = lookupUnit(toUnit);

  if (!baseUnit && !convertUnit) {
    return qty;
  }

  if (
    !baseUnit ||
    !convertUnit ||
    !convert()
      .from(baseUnit)
      .possibilities()
      .includes(convertUnit) ||
    !convert()
      .from(convertUnit)
      .possibilities()
      .includes(baseUnit)
  ) {
    throw new Error(
      `Quantity is not convertible from ${qty.unit} to ${toUnit}`,
    );
  }

  const convertedValue = convert(qty.value)
    .from(baseUnit)
    .to(convertUnit);
  return {
    value: convertedValue,
    unit: convertUnit,
  };
};

export const addQuantities = (qty1: Quantity, qty2: Quantity) => {
  if (qty2.value === 0) {
    return qty1;
  } else if (qty1.value === 0) {
    return qty2;
  }

  const convertedQty = convertQuantity(qty1, qty2.unit);
  return {
    value: convertedQty.value + qty2.value,
    unit: convertedQty.unit,
  };
};

export const subtractQuantities = (qty1: Quantity, qty2: Quantity) => {
  return addQuantities(qty1, {
    value: -(qty2.value || 0),
    unit: qty2.unit,
  });
};
