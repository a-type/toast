import config from 'config';
import { InternalError } from 'errors';
import { logger } from 'toast-common';
import { invokeCloudRun } from 'services/common';

export default {
  syncPlan: async (groupId: string, startDate: string): Promise<void> => {
    const response = await invokeCloudRun(config.planning.host, '/syncPlan', {
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
