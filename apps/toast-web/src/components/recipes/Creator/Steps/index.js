import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { H3, Form, Input, Field, Button } from 'components/generic';
import { Formik } from 'formik';
import StepEditor, { RecipeCreateStepFragment } from './StepEditor';

export const RecipeCreateStepsFragment = gql`
  fragment RecipeCreateSteps on Recipe {
    id
    steps {
      ...RecipeCreateStep
    }
  }

  ${RecipeCreateStepFragment}
`;

const CreateStep = gql`
  mutation CreateStep($recipeId: ID!, $input: RecipeStepCreateInput!) {
    createRecipeStep(recipeId: $recipeId, input: $input) {
      ...RecipeCreateSteps
    }
  }

  ${RecipeCreateStepsFragment}
`;

export default ({ recipeId, steps }) => (
  <div>
    {steps.map(step => <StepEditor key={step.id} step={step} />)}

    <div>
      <H3>Add a Step</H3>
      <Mutation mutation={CreateStep}>
        {createStep => (
          <Formik
            onSubmit={async values => {
              await createStep({
                variables: {
                  recipeId,
                  input: values,
                },
              });
            }}
          >
            {({ values, handleSubmit, handleChange }) => (
              <Form onSubmit={handleSubmit}>
                <Field required label="Instructions">
                  <Input
                    name="text"
                    onChange={handleChange}
                    value={values.text}
                    required
                  />
                </Field>
                <Field>
                  <Button type="submit">Add</Button>
                </Field>
              </Form>
            )}
          </Formik>
        )}
      </Mutation>
    </div>
  </div>
);
