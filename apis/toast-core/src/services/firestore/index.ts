import { Firestore } from '@google-cloud/firestore';
import config from 'config';

import Plans from './Plans';

const firestore = new Firestore({
  projectId: config.gcloud.projectId,
});
firestore.settings({ timestampsInSnapshots: true });

export default {
  plans: new Plans(firestore),
};
