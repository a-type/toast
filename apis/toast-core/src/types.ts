import { Transaction } from 'neo4j-driver/types/v1';

export type TransactionFunction<TResult> = (
  tx: Transaction,
) => Promise<TResult>;
