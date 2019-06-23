import { neo4j, ApiError } from 'toast-common';
import { Request, Response } from 'express';
import { addHours, getDay, format, startOfDay } from 'date-fns';
import { syncPlan } from './common';

export default async (req: Request, res: Response) => {
  const session = neo4j.session();
  try {
    // assumes this is run at or around midnight
    const startDate = startOfDay(addHours(new Date(), 1));
    const startDay = getDay(startDate);

    console.log('for day ' + startDate);

    const groups = await session.readTransaction(async tx => {
      const result = await tx.run(
        `
        MATCH (group:Group {groceryDay: $startDay})
        RETURN group {.id}
      `,
        {
          startDay,
        },
      );

      return result.records.map(rec => rec.get('group').id);
    });

    console.log('Found ' + groups.length + ' plans');

    // batch to reduce overload
    const batchSize = 100;
    let startIndex = 0;
    do {
      const batch = groups
        .slice(startIndex, startIndex + batchSize)
        .filter(Boolean);

      await Promise.all(
        batch.map(async groupId => {
          await syncPlan(format(startDate, 'YYYY-MM-DD'), 3, groupId, session);
        }),
      );

      await new Promise(resolve => setTimeout(resolve, 500));

      startIndex += batchSize;
    } while (startIndex < groups.length);

    console.log('Sync complete');
  } catch (err) {
    console.error(err);
    throw new ApiError('Failed to sync plans', 500);
  }

  res.send('OK');
};
