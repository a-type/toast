import { S3 } from 'aws-sdk';
import uuid from 'uuid';
import config from 'config';

const s3 = new S3({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  params: {
    Bucket: config.aws.s3.bucket,
  },
});

export default {
  upload: async (file, directory) => {
    const id = uuid();
    const { stream, filename, mimetype, encoding } = file;

    const location = await s3
      .upload({
        Key: `${directory}/${id}`,
        ACL: 'public-read',
        Body: stream,
        ContentType: mimetype,
      })
      .promise()
      .then(response => response.Location);

    return {
      url: location,
      id,
    };
  },
};
