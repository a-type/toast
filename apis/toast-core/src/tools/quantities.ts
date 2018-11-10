import qty from 'js-quantities';

export interface Quantity {
  value: number;
  unit: string;
}

const safeQty = (value: number, unit: string) => {
  if (qty.getUnits().includes(unit)) {
    return qty(value, unit);
  }
  return qty(value);
};

export const addQuantities = (qty1: Quantity, qty2: Quantity) => {
  if (qty2.value === 0) {
    return qty1;
  }

  const initial = safeQty(qty1.value, qty1.unit);
  const add = safeQty(qty2.value, qty2.unit);
  if (initial.isCompatible(add)) {
    const total = initial.add(add);
    return {
      value: total.scalar,
      unit: total.unit,
    };
  } else {
    throw new Error(`Quantities are not compatible ${qty1.unit}, ${qty2.unit}`); // TODO: split out into 2 items
  }
};

export const subtractQuantities = (qty1: Quantity, qty2: Quantity) => {
  if (qty2.value === 0) {
    return qty1;
  }

  const total = safeQty(qty1.value, qty1.unit);
  const subtract = safeQty(qty2.value, qty2.unit);
  if (total.isCompatible(subtract)) {
    total.subtract(subtract);
  } else {
    throw new Error(`Quantities are not compatible ${qty1.unit}, ${qty2.unit}`);
  }
  return {
    value: total.scalar,
    unit: total.unit,
  };
};
