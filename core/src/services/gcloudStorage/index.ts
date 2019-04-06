import { Storage } from '@google-cloud/storage';
import config from 'config';
import uuid from 'uuid';
import logger from 'logger';
import { File } from 'types';

logger.info('GCloud Project ID: ', config.gcloud.projectId);
logger.info('GCloud Media Bucket: ', config.gcloud.storage.bucket);

const storage = new Storage({
  projectId: config.gcloud.projectId,
});

const bucket = config.gcloud.storage.bucket;

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
