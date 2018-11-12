import basic from './basic';
import prep from './prep';
import { Plan, PlanWeek } from 'models';

export default {
  run: (plan: Plan, weekIndex: number): PlanWeek => {
    switch (plan.strategy) {
      case 'BASIC':
        return basic(plan, weekIndex);
      case 'PREP':
        return prep(plan, weekIndex);
      default:
        return null;
    }
  },
};
