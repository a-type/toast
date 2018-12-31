import { Firestore } from '@google-cloud/firestore';
import config from 'config';

import Plans from './Plans';
import Corrections from './Corrections';

const firestore = new Firestore({
  projectId: config.gcloud.projectId,
});
firestore.settings({ timestampsInSnapshots: true });

export interface FirestoreService {
  firestore: Firestore;
  plans: Plans;
  corrections: Corrections;
}

const service: FirestoreService = ({
  firestore,
} as unknown) as FirestoreService;

service.plans = new Plans(service);
service.corrections = new Corrections(service);

export default service;
