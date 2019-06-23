import { neo4j, ApiError } from 'toast-common';
import { Request, Response } from 'express';
import { syncPlan } from './common';

export default async (req: Request, res: Response) => {
  const {
    groupId,
    startDate,
    weekCount = 3,
  }: { groupId: string; startDate: string; weekCount: number } = req.body;

  if (!groupId) {
    throw new ApiError('groupId parameter is required', 400);
  }

  if (!startDate || !/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
    throw new ApiError(
      'a startDate parameter is required in format YYYY-MM-DD',
      400,
    );
  }

  const session = neo4j.session();

  await syncPlan(startDate, weekCount, groupId, session);

  res.send('OK');
};
