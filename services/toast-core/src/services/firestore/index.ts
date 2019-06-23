import { Firestore } from '@google-cloud/firestore';
import config from 'config';

import GroupInvitations from './GroupInvitations';
import PurchaseLists from './PurchaseLists';

const firestore = new Firestore({
  projectId: config.gcloud.projectId,
});

export interface FirestoreService {
  firestore: Firestore;
  groupInvitations: GroupInvitations;
  purchaseLists: PurchaseLists;
}

const service: FirestoreService = ({
  firestore,
} as unknown) as FirestoreService;

service.groupInvitations = new GroupInvitations(service);
service.purchaseLists = new PurchaseLists(service);

export default service;
