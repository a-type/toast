import { Transaction } from 'neo4j-driver/types/v1';
import { Readable } from 'stream';

export type TransactionFunction<TResult> = (
  tx: Transaction,
) => Promise<TResult>;

export interface File {
  stream: Readable;
  filename: string;
  mimetype: string;
}
