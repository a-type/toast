import basic from './basic';
import prep from './prep';
import { Schedule, PlanWeek } from 'models';

export default {
  run: (plan: Schedule, weekIndex: number): PlanWeek => {
    switch (plan.strategy) {
      case 'PREP':
        return prep(plan, weekIndex);
      default:
        return basic(plan, weekIndex);
    }
  },
};
