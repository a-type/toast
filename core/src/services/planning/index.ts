import config from 'config';
import fetch from 'node-fetch';
import { InternalError } from 'errors';
import logger from 'logger';
import { startOfWeek, format } from 'date-fns';

export default {
  syncPlan: async (groupId: string): Promise<void> => {
    const startDate = format(startOfWeek(new Date()), 'YYYY-MM-DD');
    const response = await fetch(config.planning.host + '/syncPlan', {
      method: 'POST',
      body: JSON.stringify({
        groupId,
        startDate,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const responseBody = await response.json();
      logger.fatal('Sync meal plan failed:');
      logger.fatal(responseBody);
      throw new InternalError('Failed to sync meal plan');
    }
  },
};
