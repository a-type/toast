import { removeUndefined, quantities } from 'tools';

export interface PurchaseListItem {
  shoppingListItemId: string;
  quantity: number;
  unit?: string;
}

export interface PurchaseListData {
  startDate: string;
  endDate: string;
  foods: {
    [foodId: string]: PurchaseListItem;
  };
}

export default class PurchaseList {
  data: PurchaseListData;

  constructor(data: PurchaseListData) {
    this.data = data;
  }

  get startDate() {
    return new Date(this.data.startDate);
  }

  get endDate() {
    return new Date(this.data.endDate);
  }

  get foods() {
    return this.data.foods;
  }

  getIngredient = (id: string) => this.data.foods[id];

  setIngredient = (id: string, item: PurchaseListItem) => {
    item.shoppingListItemId = id;
    this.data.foods[id] = item;
  };

  purchase = (
    id: string,
    quantity: number,
    unit?: string,
  ): PurchaseListItem => {
    this.data.foods[id] = {
      shoppingListItemId: id,
      quantity,
      unit,
    };

    return this.data.foods[id];
  };

  unpurchase = (id: string): PurchaseListItem => {
    this.data.foods[id] = {
      shoppingListItemId: id,
      quantity: 0,
      unit: null,
    };
    return this.data.foods[id];
  };

  toJSON() {
    return removeUndefined(this.data);
  }

  static fromJSON(data) {
    return new PurchaseList(data);
  }

  static createEmpty(startDate: Date, endDate: Date) {
    return new PurchaseList({
      startDate: startDate.toUTCString(),
      endDate: endDate.toUTCString(),
      foods: {},
    });
  }
}
