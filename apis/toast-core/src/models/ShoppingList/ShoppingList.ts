import { dates, removeUndefined, quantities } from 'tools';
import { RecipeWithIngredients } from 'services/graph/sources/Recipes';
import { getDay } from 'date-fns';

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

  addRecipe = (recipe: RecipeWithIngredients, servings: number) => {
    const multiplier = servings / recipe.servings;
    this.data.ingredients = recipe.ingredients.reduce(
      (ingredients, recipeIngredient) => {
        const existing: ShoppingListItem = ingredients[
          recipeIngredient.ingredient.id
        ] || {
          ingredientId: recipeIngredient.ingredient.id,
          totalValue: 0,
          purchasedValue: 0,
        };
        const added = quantities.addQuantities(
          {
            value: existing.totalValue || 0,
            unit: existing.unit,
          },
          {
            value: (recipeIngredient.value || 0) * multiplier,
            unit: recipeIngredient.unit,
          },
        );
        existing.totalValue = Math.max(0, added.value);
        existing.unit = added.unit;
        ingredients[recipeIngredient.ingredient.id] = existing;
        return ingredients;
      },
      this.data.ingredients,
    );
  };

  removeRecipe = (recipe: RecipeWithIngredients, servings: number) => {
    const multiplier = servings / recipe.servings;
    this.data.ingredients = recipe.ingredients.reduce(
      (ingredients, recipeIngredient) => {
        const existing: ShoppingListItem = ingredients[
          recipeIngredient.ingredient.id
        ] || {
          ingredientId: recipeIngredient.ingredient.id,
          totalValue: 0,
          purchasedValue: 0,
        };
        const subtracted = quantities.subtractQuantities(
          {
            value: Math.max(0, existing.totalValue || 0),
            unit: existing.unit,
          },
          {
            value: Math.max(0, (recipeIngredient.value || 0) * multiplier),
            unit: recipeIngredient.unit,
          },
        );
        existing.totalValue = Math.max(0, subtracted.value);
        existing.unit = subtracted.unit;
        if (existing.totalValue === 0) {
          delete ingredients[recipeIngredient.ingredient.id];
        } else {
          ingredients[recipeIngredient.ingredient.id] = existing;
        }
        return ingredients;
      },
      this.data.ingredients,
    );
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

  static getCurrentRange(groceryDay: number) {
    const today = getDay(Date.now());
    const startCookingDay = groceryDay + 1; // buying groceries the day before we start cooking
    // TODO: deterimine if there's a better way to do this...
    if (today <= groceryDay) {
      const startDateIndex =
        dates.getDateIndex(new Date()) + (startCookingDay - today);
      const endDateIndex = startDateIndex + 7;
      return [startDateIndex, endDateIndex];
    } else {
      const startDateIndex =
        dates.getDateIndex(new Date()) + (7 - (today - startCookingDay));
      const endDateIndex = startDateIndex + 7;
      return [startDateIndex, endDateIndex];
    }
  }
}
