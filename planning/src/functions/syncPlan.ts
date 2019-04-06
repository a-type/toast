import neo4j from '../services/neo4j';
import {
  cleanOldWeeks,
  getExistingWeekPattern,
  createWeekFromPatternIfNone,
} from './common';
import { Request, Response } from 'express';
import ApiError from '../ApiError';
import { addDays, parse, format } from 'date-fns';

export default async (req: Request, res: Response) => {
  const {
    groupId,
    startDate,
    weekCount = 2,
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

  const session = neo4j.session();
  await session.writeTransaction(async tx => {
    const lastWeek = format(addDays(parse(startDate), -7), 'YYYY-MM-DD');

    // first clean up old state
    await cleanOldWeeks(tx, groupId, lastWeek);

    console.debug(`Cloning ${lastWeek} if present`);

    const lastWeekPattern = await getExistingWeekPattern(tx, groupId, lastWeek);

    for (let weekIndex = 0; weekIndex < weekCount; weekIndex++) {
      const firstDay = format(
        addDays(parse(startDate), weekIndex * 7),
        'YYYY-MM-DD',
      );
      await createWeekFromPatternIfNone(tx, groupId, firstDay, lastWeekPattern);
    }
  });

  res.send('OK');
};
