import { gql } from 'apollo-server-express';
import { Schedule, Plan, Meal } from 'models';
import { MealActionEat, MealActionCook } from 'models/Meal/Meal';
import { Context } from 'context';
import { path } from 'ramda';
import { UserInputError } from 'errors';

export const typeDefs = gql`
  enum MealActionType {
    EAT_OUT
    COOK
    EAT
    READY_MADE
    SKIP
  }

  enum MealRecipeType {
    QUICK
    BIG
    FANCY
    NORMAL
  }

  interface MealAction {
    id: ID!
    type: MealActionType!
    dayIndex: Int
    mealIndex: Int
  }

  type MealActionEatOut implements MealAction {
    id: ID!
    type: MealActionType!
    dayIndex: Int
    mealIndex: Int
    note: String
  }

  type MealActionCook implements MealAction {
    id: ID!
    type: MealActionType!
    dayIndex: Int
    mealIndex: Int
    servings: Int!
    recipeType: MealRecipeType!
    recipe: Recipe
  }

  type MealActionEat implements MealAction {
    id: ID!
    type: MealActionType!
    dayIndex: Int
    mealIndex: Int
    leftovers: Boolean!
    cookAction: MealActionCook
  }

  type MealActionReadyMade implements MealAction {
    id: ID!
    type: MealActionType!
    dayIndex: Int
    mealIndex: Int
    note: String
  }

  type MealActionSkip implements MealAction {
    id: ID!
    type: MealActionType!
    dayIndex: Int
    mealIndex: Int
  }

  type PlanMeal {
    id: ID!
    mealIndex: Int!
    dateIndex: Int!
    dayIndex: Int!
    date: Date!
    actions: [MealAction!]!
  }

  extend type Mutation {
    setPlanMealRecipe(
      dateIndex: Int!
      mealIndex: Int!
      actionId: ID!
      recipeId: ID!
    ): MealAction!
  }

  extend type Plan {
    meal(date: Date!, mealIndex: Int!): PlanMeal!
    meals(startDate: Date!, endDate: Date): [PlanMeal!]!
  }

  extend type Schedule {
    """
    Lets the user preview how a week would look with a particular strategy (even if they don't have access to the strategy)
    """
    templateWeek(strategy: ScheduleStrategy!): [PlanMeal!]!
  }
`;

export const resolvers = {
  Mutation: {
    setPlanMealRecipe: async (
      _parent,
      { dateIndex, mealIndex, actionId, recipeId },
      ctx: Context,
    ) => {
      const group = await ctx.graph.groups.getMine();
      const planId = path(['planId'], group);

      if (!planId) {
        throw new UserInputError(
          "You can't start planning without creating a plan first",
        );
      }

      let meal = await ctx.firestore.plans.getMeal(
        planId,
        dateIndex,
        mealIndex,
      );

      const action = meal.setActionRecipe(actionId, recipeId);
      await ctx.firestore.plans.setMeal(planId, meal);

      // TODO: invalidate shopping list!

      return action;
    },
  },

  Plan: {
    meal: async (parent: Plan, { date, mealIndex }, ctx: Context) => {
      const { id: planId } = parent;

      const dateIndex = Meal.getDateIndex(date);

      let meal = await ctx.firestore.plans.getMeal(
        planId,
        dateIndex,
        mealIndex,
      );

      return meal;
    },

    meals: async (parent: Plan, { startDate, endDate }, ctx: Context) => {
      const { id: planId } = parent;
      let meals;
      const startIndex = Meal.getDateIndex(startDate);

      if (startDate && endDate) {
        const endIndex = Meal.getDateIndex(endDate);

        meals = await ctx.firestore.plans.getMealRange(
          planId,
          startIndex,
          endIndex,
        );
      } else if (startDate) {
        meals = await ctx.firestore.plans.getMealsByDate(planId, startIndex);
      }

      return meals;
    },
  },

  MealAction: {
    __resolveType: obj => {
      switch (obj.type) {
        case 'COOK':
          return 'MealActionCook';
        case 'EAT':
          return 'MealActionEat';
        case 'EAT_OUT':
          return 'MealActionEatOut';
        case 'READY_MADE':
          return 'MealActionReadyMade';
        case 'SKIP':
          return 'MealActionSkip';
      }
    },
  },

  MealActionEat: {
    cookAction: async (parent: MealActionEat, _args, ctx: Context) => {
      const info = Meal.getInfoFromActionId(parent.cookActionId);

      const group = await ctx.graph.groups.getMine();
      const planId = path<string>(['planId'], group);

      let meal = await ctx.firestore.plans.getMeal(
        planId,
        info.dateIndex,
        info.mealIndex,
      );

      return meal.getAction(parent.cookActionId);
    },
  },

  MealActionCook: {
    recipe: (parent: MealActionCook, _args, ctx: Context) => {
      if (parent.recipeId) {
        return ctx.graph.recipes.get(parent.recipeId);
      }
      return null;
    },
  },
};