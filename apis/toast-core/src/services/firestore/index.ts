import { Firestore } from '@google-cloud/firestore';
import config from 'config';

import Plans from './Plans';
import RecipeIngredientCorrections from './RecipeIngredientCorrections';

const firestore = new Firestore({
  projectId: config.gcloud.projectId,
});
firestore.settings({ timestampsInSnapshots: true });

export interface FirestoreService {
  firestore: Firestore;
  plans: Plans;
  recipeIngredientCorrections: RecipeIngredientCorrections;
}

const service: FirestoreService = ({
  firestore,
} as unknown) as FirestoreService;

service.plans = new Plans(service);
service.recipeIngredientCorrections = new RecipeIngredientCorrections(service);

export default service;
