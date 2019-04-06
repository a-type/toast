import { TransactionFunction } from 'types';

export type GraphContext = {
  user: { id: string };
  scopes: string[];
  transaction<TResult>(
    txFunction: TransactionFunction<TResult>,
  ): Promise<TResult>;
  writeTransaction<TResult>(
    txFunction: TransactionFunction<TResult>,
  ): Promise<TResult>;
  readTransaction<TResult>(
    txFunction: TransactionFunction<TResult>,
  ): Promise<TResult>;
};
