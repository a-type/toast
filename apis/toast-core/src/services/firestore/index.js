import Firestore from '@google-cloud/firestore';
import config from 'config';

import plans from './plans';

const firestore = new Firestore({
  projectId: config.gcloud.projectId,
});

export default {
  plans: plans(firestore),
};
