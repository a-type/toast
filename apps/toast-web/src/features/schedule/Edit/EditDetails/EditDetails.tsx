import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Formik } from 'formik';
import { Field, Input, Button, Form } from 'components/generic';
import { Schedule } from 'generated/schema';

const fragments = {
  schedule: gql`
    fragment EditDetails on Schedule {
      id
      defaultServings
    }
  `,
};

const SetScheduleDetails = gql`
  mutation SetScheduleDetails($details: ScheduleSetDetailsInput!) {
    setScheduleDetails(details: $details) {
      ...EditDetails
    }
  }

  ${fragments.schedule}
`;

export interface EditDetailsProps {
  schedule: Schedule;
  onSave(): void;
}

const EditDetails = ({ schedule, onSave }) => (
  <Mutation mutation={SetScheduleDetails}>
    {mutate => (
      <Formik
        initialValues={schedule}
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
              <Button type="submit">{!!schedule ? 'Save' : 'Create'}</Button>
            </Field>
          </Form>
        )}
      </Formik>
    )}
  </Mutation>
);

EditDetails.fragments = fragments;

export default EditDetails;
