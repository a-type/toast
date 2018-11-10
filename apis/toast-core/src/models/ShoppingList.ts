import { quantities, removeUndefined } from 'tools';

export interface ShoppingListItem {
  ingredientId: string;
  totalValue: number;
  purchasedValue: number;
  unit?: string;
}

export interface ShoppingListIngredientQuantities {
  [id: string]: ShoppingListItem;
}

export interface ShoppingListData {
  id: string;
  weekIndex: number;
  ingredients: ShoppingListIngredientQuantities;
}

const EMPTY: ShoppingListData = {
  id: '',
  weekIndex: 0,
  ingredients: {},
};

const merge = (defaults, data) => ({
  ...defaults,
  ...data,
});

export default class ShoppingList {
  data: ShoppingListData;

  constructor(data = EMPTY) {
    this.data = merge(EMPTY, data);
  }

  get id() {
    return this.data.id;
  }

  get weekIndex() {
    return this.data.weekIndex;
  }

  get ingredients() {
    return this.data.ingredients;
  }

  getIngredient = id => this.data.ingredients[id];

  setIngredient = (id, item: ShoppingListItem) => {
    item.ingredientId = id;
    this.data.ingredients[id] = item;
  };

  addPurchase = (id, { unit, value }) => {
    const existing = this.data.ingredients[id];
    if (!existing) {
      this.data.ingredients[id] = {
        ingredientId: id,
        unit: unit,
        totalValue: value,
        purchasedValue: value,
      };
    } else {
      const added = quantities.addQuantities(
        { value: existing.purchasedValue, unit: existing.unit },
        {
          unit,
          value,
        },
      );
      this.data.ingredients[id].purchasedValue = added.value;
    }
  };

  toJSON() {
    return removeUndefined(this.data);
  }

  static fromJSON(data) {
    return new ShoppingList(data);
  }
}
