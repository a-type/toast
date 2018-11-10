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

  purchase = id => {
    const existing = this.data.ingredients[id];
    if (!existing) {
      return;
    } else {
      this.data.ingredients[id].purchasedValue = this.data.ingredients[
        id
      ].totalValue;
    }
  };

  unpurchase = id => {
    const existing = this.data.ingredients[id];
    if (!existing) {
      return;
    } else {
      this.data.ingredients[id].purchasedValue = 0;
    }
  };

  toJSON() {
    return removeUndefined(this.data);
  }

  static fromJSON(data) {
    return new ShoppingList(data);
  }
}
