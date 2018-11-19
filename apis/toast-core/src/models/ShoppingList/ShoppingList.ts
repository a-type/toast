import { dates, removeUndefined } from 'tools';

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
  startDateIndex: number;
  endDateIndex: number;
  ingredients: ShoppingListIngredientQuantities;
}

const EMPTY: ShoppingListData = {
  id: '',
  startDateIndex: 0,
  endDateIndex: 0,
  ingredients: {},
};

const merge = (defaults, data) => ({
  ...defaults,
  ...data,
});

export default class ShoppingList {
  data: ShoppingListData;

  constructor(data) {
    this.data = data;
  }

  get id() {
    return this.data.id;
  }

  get startDateIndex() {
    return this.data.startDateIndex;
  }

  get endDateIndex() {
    return this.data.endDateIndex;
  }

  get startDate() {
    return dates.getDate(this.data.startDateIndex);
  }

  get endDate() {
    return dates.getDate(this.data.endDateIndex);
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

  static getId(startDateIndex: number, endDateIndex: number) {
    return `shoppingList_${startDateIndex}_${endDateIndex}`;
  }

  static createEmpty(startDateIndex: number, endDateIndex: number) {
    return new ShoppingList({
      id: ShoppingList.getId(startDateIndex, endDateIndex),
      startDateIndex,
      endDateIndex,
      ingredients: {},
    });
  }
}
