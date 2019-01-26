import { Request, Response } from 'express';

const MOCK_USER = {
  uid: 'mock-user-id',
  exp: 0,
  iat: 0,
  aud: 'foo',
  iss: 'foo',
  sub: 'mock-user-id',
  auth_time: 0,
};

export default (req: Request, res: Response, next: () => void) => {
  if (req.headers.authorization) {
    req.user = MOCK_USER;
  }

  next();
};
