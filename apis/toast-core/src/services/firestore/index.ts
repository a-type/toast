import { Firestore } from '@google-cloud/firestore';
import config from 'config';

import Plans from './Plans';
import RecipeIngredientCorrections from './RecipeIngredientCorrections';
import GroupInvitations from './GroupInvitations';

const firestore = new Firestore({
  projectId: config.gcloud.projectId,
});

export interface FirestoreService {
  firestore: Firestore;
  plans: Plans;
  recipeIngredientCorrections: RecipeIngredientCorrections;
  groupInvitations: GroupInvitations;
}

const service: FirestoreService = ({
  firestore,
} as unknown) as FirestoreService;

service.plans = new Plans(service);
service.recipeIngredientCorrections = new RecipeIngredientCorrections(service);
service.groupInvitations = new GroupInvitations(service);

export default service;
