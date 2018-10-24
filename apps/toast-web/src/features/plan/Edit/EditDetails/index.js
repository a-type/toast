import React from 'react';
import gql from 'fraql';
import { Mutation } from 'react-apollo';
import { Formik } from 'formik';
import { Field, Input, Button, Form } from 'components/generic';

const fragments = {
  plan: gql`
    fragment EditDetails on Plan {
      id
      defaultServings
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

const EditDetails = ({ plan, onSave }) => (
  <Mutation mutation={SetPlanDetails}>
    {mutate => (
      <Formik
        initialValues={plan}
        onSubmit={async values => {
          await mutate({ variables: { details: values } });
          onSave();
        }}
      >
        {({ values, handleSubmit, handleChange }) => (
          <Form onSubmit={handleSubmit}>
            <Field label="Servings per meal" required>
              <Input
                value={values.defaultServings}
                name="defaultServings"
                onChange={handleChange}
              />
            </Field>
            <Field>
              <Button type="submit">{!!plan ? 'Save' : 'Create'}</Button>
            </Field>
          </Form>
        )}
      </Formik>
    )}
  </Mutation>
);

EditDetails.fragments = fragments;

export default EditDetails;
