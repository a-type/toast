import { Firestore } from '@google-cloud/firestore';
import config from 'config';

import RecipeIngredientCorrections from './RecipeIngredientCorrections';
import GroupInvitations from './GroupInvitations';
import PurchaseLists from './PurchaseLists';

const firestore = new Firestore({
  projectId: config.gcloud.projectId,
});

export interface FirestoreService {
  firestore: Firestore;
  recipeIngredientCorrections: RecipeIngredientCorrections;
  groupInvitations: GroupInvitations;
  purchaseLists: PurchaseLists;
}

const service: FirestoreService = ({
  firestore,
} as unknown) as FirestoreService;

service.recipeIngredientCorrections = new RecipeIngredientCorrections(service);
service.groupInvitations = new GroupInvitations(service);
service.purchaseLists = new PurchaseLists(service);

export default service;
