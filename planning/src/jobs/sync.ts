import neo4j from '../services/neo4j';
import fetch from 'node-fetch';
import { addDays, getDay } from 'date-fns';

const session = neo4j.session();
const endpoint = process.env.PLANNING_API_ENDPOINT;

console.log('Syncing all plans');
(async () => {
  try {
    const startDate = getDay(addDays(new Date(), 1));

    console.log('for day index ' + startDate);

    const groups = await session.readTransaction(async tx => {
      const result = await tx.run(
        `
        MATCH (group:Group {groceryDay: $startDate})
        RETURN group {.id}
      `,
        {
          startDate,
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
          console.debug(`Syncing plan for ${groupId}`);
          const result = await fetch(endpoint + '/syncPlan', {
            method: 'post',
            body: JSON.stringify({
              groupId,
              startDate,
              // todo: pass more stuff based on group config / plan
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!result.ok) {
            console.error(`Sync failed for group ${groupId}`);
            console.error(result.status);
            try {
              const body = await result.text();
              console.error(body);
            } catch (err) {
              console.error('Could not read body:');
              console.error(err);
            }
          }
        }),
      );

      startIndex += batchSize;
    } while (startIndex < groups.length);

    console.log('Sync complete');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
