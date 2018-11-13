import { Firestore } from '@google-cloud/firestore';
import config from 'config';

import Schedules from './Schedules';

const firestore = new Firestore({
  projectId: config.gcloud.projectId,
});
firestore.settings({ timestampsInSnapshots: true });

export default {
  schedules: new Schedules(firestore),
};
