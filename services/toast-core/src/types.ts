import { Readable } from 'stream';

export interface File {
  stream: Readable;
  filename: string;
  mimetype: string;
}
