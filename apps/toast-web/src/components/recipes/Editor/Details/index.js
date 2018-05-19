// @flow

import React from 'react';
import CreateStateProvider from './CreateStateProvider';
import UpdateStateProvider from './UpdateStateProvider';
import Form from './Form';
import { type Recipe } from 'types';

const renderForm = params => <Form {...params} />;

const RecipeEditorDetails = ({ recipe }: { recipe: Recipe }) =>
  recipe ? (
    <UpdateStateProvider recipe={recipe}>{renderForm}</UpdateStateProvider>
  ) : (
    <CreateStateProvider>{renderForm}</CreateStateProvider>
  );

export default RecipeEditorDetails;
