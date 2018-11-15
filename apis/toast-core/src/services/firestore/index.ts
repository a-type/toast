import { Firestore } from '@google-cloud/firestore';
import config from 'config';

import Schedules from './Schedules';
import Plans from './Plans';

const firestore = new Firestore({
  projectId: config.gcloud.projectId,
});
firestore.settings({ timestampsInSnapshots: true });

export interface FirestoreService {
  firestore: Firestore;
  schedules: Schedules;
  plans: Plans;
}

const service: FirestoreService = ({
  firestore,
} as unknown) as FirestoreService;

service.schedules = new Schedules(service);
service.plans = new Plans(service);

export default service;
