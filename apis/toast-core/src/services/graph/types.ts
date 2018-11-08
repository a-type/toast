import { TransactionFunction } from 'types';

export type GraphContext = {
  user: { id: string };
  scopes: string[];
  transaction(txFunction: TransactionFunction): Promise<{}>;
  writeTransaction(txFunction: TransactionFunction): Promise<{}>;
  readTransaction(txFunction: TransactionFunction): Promise<{}>;
};
