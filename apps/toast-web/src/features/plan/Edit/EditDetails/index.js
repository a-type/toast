import React from 'react';
import gql from 'fraql';
import { Mutation } from 'react-apollo';
import { Formik } from 'formik';
import { Field, Input, Button } from 'components/generic';

const fragments = {
  plan: gql`
    fragment EditDetails on Plan {
      id
      servingsPerMeal
    }
  `,
};

const SetPlanDetails = gql`
  mutation SetPlanDetails($details: PlanSetDetailsInput!) {
    setPlanDetails(details: $details) {
      ${fragments.plan}
    }
  }
`;

const EditDetails = ({ plan }) => (
  <Mutation mutation={SetPlanDetails}>
    {mutate => (
      <Formik
        initialValues={plan}
        onSubmit={values => mutate({ variables: { details: values } })}
      >
        {({ values, handleSubmit, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <Field label="Servings per meal" required>
              <Input
                value={values.servingsPerMeal}
                name="servingsPerMeal"
                onChange={handleChange}
              />
            </Field>
            <Button type="submit">{!!plan ? 'Save' : 'Create'}</Button>
          </form>
        )}
      </Formik>
    )}
  </Mutation>
);

EditDetails.fragments = fragments;

export default EditDetails;
