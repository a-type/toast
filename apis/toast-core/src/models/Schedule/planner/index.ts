import basic from './basic';
import prep from './prep';
import { Schedule, Meal } from 'models';
import { ScheduleStrategy } from 'models/Schedule/Schedule';
import { initializeWeek } from './utils';

export default {
  run: (schedule: Schedule): Meal[] => {
    const meals = initializeWeek();

    switch (schedule.strategy) {
      case ScheduleStrategy.Prep:
        return prep(schedule, meals);
      default:
        return basic(schedule, meals);
    }
  },
};
