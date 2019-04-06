import fetch from 'node-fetch';
import { Readable } from 'stream';
import { id } from '../../tools';
import { Storage } from '@google-cloud/storage';
import mime from 'mime-types';

const projectId = process.env.GCLOUD_PROJECT_ID;
const bucket = process.env.GCLOUD_IMAGE_BUCKET;

console.info('GCloud Project ID: ', projectId);
console.info('GCloud Image Bucket: ', bucket);

const storage = new Storage({
  projectId,
});

export const saveFromUrl = async (imageUrl: string) => {
  const response = await fetch(imageUrl);
  const filename = imageUrl.split('/').pop();
  const fileExt = filename.split('.').pop();
  const buffer = await response.buffer();
  const stream = new Readable();
  stream._read = () => {};
  stream.push(buffer);
  stream.push(null);

  const imageId = id('image');
  const directory = 'images';
  const fileName = `${directory}/${imageId}`;

  const gFile = storage.bucket(bucket).file(fileName);

  return await new Promise<{ id: string; url: string }>((resolve, reject) => {
    stream.pipe(
      gFile
        .createWriteStream({
          public: true,
          metadata: { contentType: mime(fileExt) },
        })
        .on('error', err => {
          console.error('GCloud image upload failure');
          console.error(err);
          reject(err);
        })
        .on('finish', () => {
          resolve({
            id: imageId,
            url: `https://storage.googleapis.com/${bucket}/${fileName}`,
          });
        }),
    );
  });
};
