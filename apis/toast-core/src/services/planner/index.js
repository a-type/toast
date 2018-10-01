import basic from './basic';
import prep from './prep';
import bigPrep from './bigPrep';

export default {
  run: plan => {
    switch (plan.strategy) {
      case 'basic':
        return basic(plan);
      case 'prep':
        return prep(plan);
      case 'bigPrep':
        return bigPrep(plan);
    }
  },
};
