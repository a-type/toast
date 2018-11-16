import { gql } from 'apollo-server-express';
import { Schedule, Plan, Meal } from 'models';
import { Context } from 'context';
import { path } from 'ramda';
import { UserInputError } from 'errors';
import planner from 'models/Meal/planner';

export const typeDefs = gql`
  enum PlanMealActionType {
    EAT_OUT
    COOK
    EAT
    READY_MADE
    SKIP
  }

  enum PlanMealRecipeType {
    QUICK
    BIG
    FANCY
    NORMAL
  }

  interface PlanAction {
    id: ID!
    type: PlanActionType!
    dayIndex: Int
    mealIndex: Int
  }

  type PlanActionEatOut implements PlanAction {
    id: ID!
    type: PlanActionType!
    dayIndex: Int
    mealIndex: Int
    note: String
  }

  type PlanActionCook implements PlanAction {
    id: ID!
    type: PlanActionType!
    dayIndex: Int
    mealIndex: Int
    servings: Int!
    mealType: ScheduleMealType!
    recipe: Recipe
  }

  type PlanActionEat implements PlanAction {
    id: ID!
    type: PlanActionType!
    dayIndex: Int
    mealIndex: Int
    leftovers: Boolean!
    cookAction: PlanActionCook
  }

  type PlanActionReadyMade implements PlanAction {
    id: ID!
    type: PlanActionType!
    dayIndex: Int
    mealIndex: Int
    note: String
  }

  type PlanActionSkip implements PlanAction {
    id: ID!
    type: PlanActionType!
    dayIndex: Int
    mealIndex: Int
  }

  type PlanMeal {
    id: ID!
    mealIndex: Int!
    dateIndex: Int!
    date: Date!
    actions: [PlanAction!]!
  }

  extend type Mutation {
    setPlanMealRecipe(
      dateIndex: Int!
      mealIndex: Int!
      actionId: ID!
      recipeId: ID!
    ): PlanAction!
  }

  extend type Plan {
    meal(date: Date!, mealIndex: Int!): PlanMeal!
    meals(startDate: Date!, endDate: Date): [PlanMeal!]!
  }

  extend type Schedule {
    """
    Lets the user preview how a week would look with a particular strategy (even if they don't have access to the strategy)
    """
    previewWeek(strategy: PlanStrategy!): [PlanMeal!]!
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

      const meal = await ctx.firestore.plans.getMeal(
        planId,
        dateIndex,
        mealIndex,
      );
      const action = meal.setActionRecipe(actionId, recipeId);
      await ctx.firestore.plans.setMeal(planId, meal);
      return action;
    },
  },

  Plan: {
    meal: async (parent: Plan, { date, mealIndex }, ctx: Context) => {
      const { id: planId } = parent;

      const dateIndex = Meal.getDateIndex(date);

      const meal = await ctx.firestore.plans.getMeal(
        planId,
        dateIndex,
        mealIndex,
      );
      return meal;
    },

    meals: async (parent: Plan, { startDate, endDate }, ctx: Context) => {
      const { id: planId } = parent;

      if (startDate && endDate) {
        const startIndex = Meal.getDateIndex(startDate);
        const endIndex = Meal.getDateIndex(endDate);

        const meals = await ctx.firestore.plans.getMealRange(
          planId,
          startIndex,
          endIndex,
        );
        return meals;
      } else if (startDate) {
        const startIndex = Meal.getDateIndex(startDate);
        const meals = await ctx.firestore.plans.getMealsByDate(
          planId,
          startIndex,
        );
        return meals;
      }
    },
  },

  Schedule: {
    previewWeek: (parent: Schedule, { strategy }, ctx: Context) => {
      const scheduleCopy = Schedule.fromJSON(parent.toJSON());
      scheduleCopy.strategy = strategy;
      const week = planner.run(scheduleCopy, 0, 7);
      return week;
    },
  },
};
