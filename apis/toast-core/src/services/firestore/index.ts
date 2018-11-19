import { Firestore } from '@google-cloud/firestore';
import config from 'config';

import Plans from './Plans';

const firestore = new Firestore({
  projectId: config.gcloud.projectId,
});
firestore.settings({ timestampsInSnapshots: true });

export interface FirestoreService {
  firestore: Firestore;
  plans: Plans;
}

const service: FirestoreService = ({
  firestore,
} as unknown) as FirestoreService;

service.plans = new Plans(service);

export default service;
