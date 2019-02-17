import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Field } from 'components/generic';
import { Formik } from 'formik';
import StepEditor, { RecipeCreateStepFragment } from './StepEditor';
import { Heading, TextInput, Button } from 'grommet';

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
    {steps.map(step => (
      <StepEditor key={step.id} step={step} />
    ))}

    <div>
      <Heading level="3">Add a Step</Heading>
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
            initialValues={{
              text: '',
            }}
          >
            {({ values, handleSubmit, handleChange }) => (
              <form onSubmit={handleSubmit}>
                <Field required label="Instructions">
                  <TextInput
                    name="text"
                    onChange={handleChange}
                    value={values.text}
                    required
                  />
                </Field>
                <Field>
                  <Button type="submit" label="Add" />
                </Field>
              </form>
            )}
          </Formik>
        )}
      </Mutation>
    </div>
  </div>
);
