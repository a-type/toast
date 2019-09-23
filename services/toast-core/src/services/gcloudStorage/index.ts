import { Storage } from '@google-cloud/storage';
import config from 'config';
import uuid from 'uuid';
import { logger } from 'toast-common';
import { File } from 'types';

const projectId = process.env.GCLOUD_PROJECT_ID;
const bucket = process.env.GCLOUD_STORAGE_BUCKET;

logger.info('GCloud Project ID: ', projectId);
logger.info('GCloud Media Bucket: ', bucket);

const storage = new Storage({
  projectId: projectId,
});

export interface UploadResult {
  id: string;
  url: string;
}

export type MediaType = 'images';

export default {
  upload: async (file: File, mediaType: MediaType): Promise<UploadResult> => {
    const id = uuid();
    const { stream, mimetype } = file;

    const directory = config.gcloud.storage.directories[mediaType];
    const fileName = `${directory}/${id}`;

    const gFile = storage.bucket(bucket).file(fileName);

    return new Promise<UploadResult>((resolve, reject) => {
      stream
        .pipe(
          gFile.createWriteStream({
            public: true,
            metadata: { contentType: mimetype },
          }),
        )
        .on('error', err => {
          logger.fatal('GCloud image upload failure');
          logger.fatal(err);
          reject(new Error(err.message));
        })
        .on('finish', () => {
          resolve({
            id,
            url: `https://storage.googleapis.com/${bucket}/${fileName}`,
          });
        });
    });
  },
};
