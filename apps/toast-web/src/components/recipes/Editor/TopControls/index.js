// @flow
import React from 'react';
import Layout from './Layout';
import CoverImageChanger from './CoverImageChanger';
import { type Recipe } from 'types';

export default ({ recipe }: { recipe: Recipe }) => (
  <Layout>
    <CoverImageChanger recipeId={recipe.id} />
  </Layout>
);
