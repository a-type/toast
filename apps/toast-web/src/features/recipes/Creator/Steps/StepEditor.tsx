import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Formik } from 'formik';
import { Field } from 'components/generic';
import { merge, pick } from 'ramda';
import styled from 'styled-components';
import { TextArea, Button } from 'grommet';

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
              <form onSubmit={handleSubmit}>
                <Field label="Instructions" required>
                  <TextArea
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
              </form>
            )}
          </Formik>
        )}
      </Mutation>
    </Container>
  );
};
