import basic from './basic';
import prep from './prep';

export default {
  run: (plan, strategy) => {
    switch (strategy) {
      case 'basic':
        return basic(plan);
      case 'prep':
        return prep(plan);
      default:
        return plan;
    }
  },
};
