import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Formik } from 'formik';
import { Form, Input, Button, Field } from 'components/generic';
import { merge, pick } from 'ramda';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: var(--spacing-lg);
`;

export const RecipeCreateStepFragment = gql`
  fragment RecipeCreateStep on RecipeStep {
    id
    index
    step {
      id
      text
    }
  }
`;

const UpdateStep = gql`
  mutation UpdateStep($id: ID!, $input: RecipeStepUpdateInput!) {
    updateRecipeStep(id: $id, input: $input) {
      ...RecipeCreateStep
    }
  }

  ${RecipeCreateStepFragment}
`;

export default ({ step }) => {
  const defaultValues = merge(
    {
      text: '',
    },
    pick(['text'], step.step),
  );

  return (
    <Container>
      <Mutation mutation={UpdateStep}>
        {save => (
          <Formik
            initialValues={defaultValues}
            enableReinitialize
            onSubmit={async values => {
              await save({
                variables: {
                  id: step.id,
                  input: values,
                },
              });
            }}
          >
            {({ values, handleSubmit, handleChange, dirty }) => (
              <Form onSubmit={handleSubmit}>
                <Field label="Instructions" required>
                  <Input.Block
                    required
                    value={values.text}
                    name="text"
                    onChange={handleChange}
                  />
                </Field>
                <Field>
                  <Button
                    type="submit"
                    disabled={!dirty}
                    label={dirty ? 'Save' : 'Saved'}
                  />
                </Field>
              </Form>
            )}
          </Formik>
        )}
      </Mutation>
    </Container>
  );
};
