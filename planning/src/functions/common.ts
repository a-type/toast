import { Transaction } from 'neo4j-driver/types/v1';
import { getDay, addDays, parse, format } from 'date-fns';
import id from '../tools/id';

export const deleteAllWeeks = (tx: Transaction, groupId: string) =>
  tx.run(
    `
    MATCH (group:Group {id: $groupId})-[:HAS_PLAN_DAY]->(planDay:PlanDay)
    WITH planDay
    OPTIONAL MATCH (planDay)-[:HAS_PLAN_MEAL]->(meal:PlanMeal)
    DETACH DELETE meal
    WITH planDay
    DETACH DELETE planDay
    `,
    {
      groupId,
    },
  );

export const cleanOldWeeks = async (
  tx: Transaction,
  groupId: string,
  firstValidDate: string,
) => {
  await tx.run(
    `
    MATCH (group:Group{id:$groupId})-[:HAS_PLAN_DAY]->(planDay:PlanDay)
    WHERE duration.between(date($sunday), coalesce(planDay.date, date("1990-01-01"))).days < 0
    WITH planDay
    OPTIONAL MATCH (planDay)-[:HAS_PLAN_MEAL]->(meal:PlanMeal)
    DETACH DELETE meal
    WITH planDay
    DETACH DELETE planDay
    `,
    {
      groupId,
      sunday: firstValidDate,
    },
  );
};

export type MealCoordinate = {
  dayOfWeek: number;
  mealName: string;
};

export type WeekPattern = {
  eatingConnections: [MealCoordinate, MealCoordinate][];
};

export const getExistingWeekPattern = async (
  tx: Transaction,
  groupId: string,
  startDate: string,
): Promise<WeekPattern> => {
  const result = await tx.run(
    `
    MATCH (group:Group {id:$groupId})
    MATCH (group)-[:HAS_PLAN_DAY]->(planDay:PlanDay)-[mealRel:HAS_PLAN_MEAL]->(planMeal:PlanMeal)
    WITH group, planDay, planMeal, mealRel, duration.between(date($startDate), coalesce(planDay.date, date("1990-01-01"))).days as daysBetween
    WHERE daysBetween < 7 AND daysBetween >= 0
    OPTIONAL MATCH (planMeal)-[:PLANS_TO_EAT]->(:PlanMeal)<-[cookMealRel:HAS_PLAN_MEAL]-(cookDay:PlanDay)
    RETURN planDay {.date}, mealRel {.meal}, cookMealRel {.meal}, cookDay {.date}
    `,
    {
      groupId,
      startDate,
    },
  );

  return result.records.reduce<WeekPattern>(
    (pattern, rec) => {
      const planDay = rec.get('planDay');
      const mealRel = rec.get('mealRel');
      const cookMealRel = rec.get('cookMealRel');
      const cookDay = rec.get('cookDay');
      if (!cookMealRel) {
        return pattern;
      }

      const fromDayOfWeek = getDay(new Date(planDay.date));
      const fromMealName = mealRel.meal;
      const toDayOfWeek = getDay(new Date(cookDay.date));
      const toMealName = cookMealRel.meal;

      pattern.eatingConnections.push([
        {
          dayOfWeek: fromDayOfWeek,
          mealName: fromMealName,
        },
        {
          dayOfWeek: toDayOfWeek,
          mealName: toMealName,
        },
      ]);

      return pattern;
    },
    { eatingConnections: [] },
  );
};

export const weekExists = async (
  tx: Transaction,
  groupId: string,
  startDate: string,
) => {
  const result = await tx.run(
    `
    MATCH (group:Group {id:$groupId})
    MATCH (group)-[:HAS_PLAN_DAY]->(planDay:PlanDay)
    WITH planDay, duration.between(date($startDate), coalesce(planDay.date, date("1990-01-01"))).days as daysBetween
    WHERE daysBetween < 7 AND daysBetween >= 0
    RETURN planDay
    `,
    {
      groupId,
      startDate,
    },
  );

  if (result.records.length === 7) {
    return true;
  }

  if (result.records.length !== 0) {
    console.warn(`Week is invalid: group: ${groupId}, start: ${startDate}`);
  }

  return false;
};

export const createWeekFromPatternIfNone = async (
  tx: Transaction,
  groupId: string,
  startDate: string,
  pattern: WeekPattern,
) => {
  const alreadyExists = await weekExists(tx, groupId, startDate);
  if (alreadyExists) {
    console.debug(`Week of ${startDate} already exists for group ${groupId}`);
    return;
  }

  const week = await createEmptyWeek(tx, groupId, startDate);

  await pattern.eatingConnections.reduce<Promise<void>>(
    async (previousTx, connection) => {
      await previousTx;

      const fromDay = week[connection[0].dayOfWeek];
      const toDay = week[connection[1].dayOfWeek];
      const fromMealName = connection[0].mealName;
      const toMealName = connection[1].mealName;

      await tx.run(
        `
      MATCH (:PlanDay {id:$fromDayId})-[:HAS_PLAN_MEAL{meal:$fromMealName}]->(fromMeal:PlanMeal),
        (:PlanDay {id:$toDayId})-[:HAS_PLAN_MEAL{meal:$toMealName}]->(toMeal:PlanMeal)
      MERGE (fromMeal)-[:PLANS_TO_EAT]->(toMeal)
      `,
        {
          fromDayId: fromDay.id,
          toDayId: toDay.id,
          fromMealName,
          toMealName,
        },
      );
    },
    Promise.resolve(),
  );

  console.debug(`Created week of ${startDate} for group ${groupId}`);
};

export const createEmptyWeek = async (
  tx: Transaction,
  groupId: string,
  startDate: string,
) => {
  const days = await new Array(7)
    .fill(null)
    .map((_, idx) => idx)
    .reduce<Promise<any[]>>(async (previousOperation, dayIndex) => {
      const list = await previousOperation;

      const date = format(addDays(parse(startDate), dayIndex), 'YYYY-MM-DD');

      const result = await tx.run(
        `
        MATCH (group:Group {id: $groupId})-[:HAS_PLAN_DAY]->(planDay:PlanDay {date: date($date)})
        OPTIONAL MATCH (planDay)-[:HAS_PLAN_MEAL]->(meal:PlanMeal)
        RETURN planDay {.id, .date}, meal
        `,
        {
          groupId,
          date,
        },
      );

      if (result.records.length) {
        const day = result.records[0].get('planDay');
        list.push(day);

        // meals are good
        if (result.records.length === 3) {
          return list;
        }
      }

      const createResult = await tx.run(
        `
        MATCH (group:Group {id: $groupId})
        CREATE (group)-[:HAS_PLAN_DAY]->(planDay:PlanDay {id: $dayId, date: date($date)})
        CREATE (planDay)-[:HAS_PLAN_MEAL{meal:"breakfast"}]->(:PlanMeal{id:$mealIds[0]})
        CREATE (planDay)-[:HAS_PLAN_MEAL{meal:"lunch"}]->(:PlanMeal{id:$mealIds[1]})
        CREATE (planDay)-[:HAS_PLAN_MEAL{meal:"dinner"}]->(:PlanMeal{id:$mealIds[2]})
        RETURN planDay {.id, .date}
        `,
        {
          groupId,
          date,
          dayId: id('planDay'),
          mealIds: [id('planMeal'), id('planMeal'), id('planMeal')],
        },
      );

      const day = createResult.records[0].get('planDay');
      list.push(day);
      return list;
    }, Promise.resolve([]));

  return days.sort((a, b) => a.date - b.date);
};
