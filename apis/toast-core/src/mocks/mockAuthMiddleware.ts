import { Request, Response } from 'express';

const MOCK_USER = {
  sub: 'mock-user-id',
  nickname: 'Mock User',
  username: 'mockuser',
};

export default (req: Request, res: Response, next: () => void) => {
  if (req.headers.authorization) {
    req.user = MOCK_USER;
  }

  next();
};
