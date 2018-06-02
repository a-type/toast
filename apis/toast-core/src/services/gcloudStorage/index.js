import Storage from '@google-cloud/storage';
import config from 'config';
import uuid from 'uuid';

const storage = new Storage({
  projectId: config.gcloud.projectId
});

const bucket = config.gcloud.storage.bucket;

export default {
  upload: async (file, mediaType) => {
    const id = uuid();
    const { stream, filename, mimetype, encoding } = file;

    const directory = config.gcloud.storage.directories[mediaType];
    const fileName = `${directory}/${filename}`;

    const file = storage.bucket(bucket).file(fileName);

    return new Promise((resolve, reject) => {
      stream
        .pipe(file.createWriteStream({ public: true }))
        .on('error', reject)
        .on('finish', () => {
          return {
            id,
            url: `https://storage.googleapis.com/${bucket}/${fileName}`
          };
        });
    });
  }
};
