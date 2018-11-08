import basic from './basic';
import prep from './prep';

export default {
  run: plan => {
    switch (plan.strategy) {
      case 'BASIC':
        return basic(plan);
      case 'PREP':
        return prep(plan);
      default:
        return plan;
    }
  },
};
