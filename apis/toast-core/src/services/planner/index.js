import basic from './basic';
import prep from './prep';

export default {
  run: (plan, strategy) => {
    switch (strategy) {
      case 'BASIC':
        return basic(plan);
      case 'PREP':
        return prep(plan);
      default:
        return plan;
    }
  },
};
