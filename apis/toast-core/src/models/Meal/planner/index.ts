import basic from './basic';
import prep from './prep';
import { Schedule, Meal } from 'models';
import { initializeWeek } from './utils';

export default {
  run: (
    schedule: Schedule,
    startDateIndex: number,
    endDateIndex: number,
  ): Meal[] => {
    const meals = initializeWeek(schedule, startDateIndex, endDateIndex);

    switch (schedule.strategy) {
      case 'PREP':
        return prep(schedule, meals);
      default:
        return basic(schedule, meals);
    }
  },
};
