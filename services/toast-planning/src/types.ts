export enum Availability {
  Skip,
  None,
  Short,
  Medium,
  Long,
}

export type ScheduleMeal = {
  availability: Availability;
};

export type ScheduleDay = {
  meals: ScheduleMeal[];
};

export type Schedule = {
  days: ScheduleDay[];
};
