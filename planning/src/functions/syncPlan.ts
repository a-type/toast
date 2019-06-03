import neo4j from '../services/neo4j';
import { Transaction } from 'neo4j-driver/types/v1';
import { Request, Response } from 'express';
import ApiError from '../ApiError';

import id from '../tools/id';

export const updateStartDay = async (
  tx: Transaction,
  groupId: string,
  startDate: string,
) => {
  const targetDayRes = await tx.run(
    `
    MATCH (group:Group{id: $groupId})
    OPTIONAL MATCH (group)-[:HAS_NEXT_PLAN_DAY*]->(targetDay:PlanDay)
    WHERE targetDay.date = date($startDate)
    RETURN targetDay
    `,
    {
      groupId,
      startDate,
    },
  );

  const targetDay =
    targetDayRes.records.length && targetDayRes.records[0].get('targetDay');

  if (targetDay) {
    /**
     * Match group and target day,
     * match all links between group and target day,
     * delete all links between,
     * link group and target day
     */
    await tx.run(
      `
      MATCH (targetDay:PlanDay{id:$targetDayId}), (group:Group{id: $groupId})
      OPTIONAL MATCH (group)-[:HAS_NEXT_PLAN_DAY*]->(day:PlanDay)
        WHERE (day)-[:HAS_NEXT_PLAN_DAY*]->(targetDay)
      WITH group, targetDay, collect(day) as days
      UNWIND days as day
      DETACH DELETE day
      MERGE (group)-[:HAS_NEXT_PLAN_DAY]->(targetDay)
      `,
      {
        targetDayId: targetDay.id,
        groupId,
      },
    );
  } else {
    await tx.run(
      `
      MATCH (group:Group{id: $groupId})
      OPTIONAL MATCH (group)-[:HAS_NEXT_PLAN_DAY]->(day:PlanDay)
      DETACH DELETE day
      WITH group
      CREATE (targetDay:PlanDay {id: $dayId, date: date($startDate)})
      MERGE (group)-[:HAS_NEXT_PLAN_DAY]->(targetDay)
      RETURN targetDay
      `,
      {
        groupId,
        startDate,
        dayId: id('planDay'),
      },
    );
  }
};

export const fillMissingDays = async (
  tx: Transaction,
  groupId: string,
  dayCount: number,
) => {
  /**
   * Match group and any existing plan day list
   * unwind range of remaining days needed to fulfill count
   * create days
   * add last old node to new day list, link them all together
   */
  await tx.run(
    `
    MATCH (group:Group{id: $groupId})
    OPTIONAL MATCH p=(group)-[:HAS_NEXT_PLAN_DAY*]->(day:PlanDay)
    WHERE NOT (day)-[:HAS_NEXT_PLAN_DAY]->()
    WITH length(p) as currentDayCount, last(nodes(p)) as lastNode
    UNWIND RANGE(1, $dayCount - coalesce(currentDayCount, 0)) as dayOffset
    CREATE (item:PlanDay {id: $dayIds[dayOffset - 1], date: lastNode.date + duration("P" + dayOffset + "D")})
    WITH [lastNode] + collect(item) as items
    UNWIND items AS item
    WITH collect(item) as items
    CALL apoc.nodes.link(items, 'HAS_NEXT_PLAN_DAY')
    RETURN items
    `,
    {
      groupId,
      dayCount,
      dayIds: new Array(dayCount).fill(null).map(() => id('planDay')),
    },
  );
};

export default async (req: Request, res: Response) => {
  const {
    groupId,
    startDate,
    weekCount = 3,
  }: { groupId: string; startDate: string; weekCount: number } = req.body;

  if (!groupId) {
    throw new ApiError('groupId parameter is required', 400);
  }

  if (!startDate || !/\d{4}-\d{2}-\d{2}/.test(startDate)) {
    throw new ApiError(
      'a startDate parameter is required in format YYYY-MM-DD',
      400,
    );
  }

  console.debug(
    `Sync: group: ${groupId}, startDate: ${startDate}, weekCount: ${weekCount}`,
  );

  const dayCount = weekCount * 7;

  const session = neo4j.session();
  await session.writeTransaction(async tx => {
    await updateStartDay(tx, groupId, startDate);
    await fillMissingDays(tx, groupId, dayCount);
  });

  res.send('OK');
};
