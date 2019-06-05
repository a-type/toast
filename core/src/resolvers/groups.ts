import { Context } from 'context';
import { getDay, addDays, startOfDay, format } from 'date-fns';

const getNextGroceryDay = (day: number) => {
  let x = new Date();
  while (getDay(x) !== day) {
    x = addDays(x, 1);
  }
  return format(startOfDay(x), 'YYYY-MM-DD');
};

export default {
  Mutation: {
    createGroup: async (parent, args, ctx: Context, info) => {
      const res = await parent.createGroup();

      const groupId = res.id || (await ctx.getGroupId());

      ctx.planning.syncPlan(groupId, getNextGroceryDay(0));

      return res;
    },

    setGroceryDay: async (parent, args, ctx: Context, info) => {
      const res = await parent.setGroceryDay();

      const groupId = res.id || (await ctx.getGroupId());

      ctx.planning.syncPlan(groupId, getNextGroceryDay(args.input.groceryDay));

      return res;
    },
  },
};
