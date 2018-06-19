// @flow

import React from 'react';
import Input from 'components/typeset/Input';
import { type RecipeEditorFormState } from './types';
import FieldLayout from './FieldLayout';

export default ({
  saving,
  title,
  description,
  onFieldChange,
  onFieldBlur,
  isTitleEnabled,
  isDescriptionEnabled,
}: RecipeEditorFormState) => (
  <div>
    <FieldLayout>
      <Input.H1
        value={title}
        onChange={e => onFieldChange('title', e.target.value)}
        onBlur={() => onFieldBlur('title')}
        disabled={!isTitleEnabled}
        placeholder="Untitled"
      />
      <Input.Block
        value={description}
        onChange={e => onFieldChange('description', e.target.value)}
        onBlur={() => onFieldBlur('title')}
        disabled={!isDescriptionEnabled}
        placeholder="Write a description of the recipe here"
      />
    </FieldLayout>
    {saving && <i>Saving...</i>}
  </div>
);
