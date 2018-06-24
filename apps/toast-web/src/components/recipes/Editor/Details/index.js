// @flow

import React from 'react';
import { type Recipe } from 'types';
import { Formik } from 'formik';
import FieldLayout from './FieldLayout';
import { Input } from 'components/typeset';
import { Loader, Form } from 'components/generic';

const renderForm = params => <Form {...params} />;

const RecipeEditorDetails = ({
  recipe,
  onChange,
}: {
  recipe: Recipe,
  onChange(data: Recipe): mixed,
}) => (
  <Formik initialValues={recipe} onSubmit={onChange}>
    {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
      <Form onSubmit={handleSubmit}>
        <FieldLayout>
          <Input.H1
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Untitled"
          />
          <Input.Block
            name="description"
            value={values.description}
            onChange={handleChange}
            placeholder="Write a brief description of the recipe here."
          />
        </FieldLayout>
        <Form.AutoSave
          values={values}
          onSave={onChange}
          timeout={1000}
          render={({ isSaving }) => isSaving && <Loader size="30px" />}
        />
      </Form>
    )}
  </Formik>
);

export default RecipeEditorDetails;
