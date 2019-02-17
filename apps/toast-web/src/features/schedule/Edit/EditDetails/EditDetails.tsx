import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Formik } from 'formik';
import { Field } from 'components/generic';
import { Schedule } from 'generated/schema';
import { pathOr } from 'ramda';
import { Button, TextInput } from 'grommet';

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
        initialValues={{
          defaultServings: pathOr('', ['defaultServings'], schedule),
        }}
        onSubmit={async values => {
          await mutate({
            variables: {
              details: {
                defaultServings: values.defaultServings,
              },
            },
          });
          onSave();
        }}
      >
        {({ values, handleSubmit, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <Field label="Servings per meal" required>
              <TextInput
                value={values.defaultServings}
                name="defaultServings"
                onChange={handleChange}
              />
            </Field>
            <Field>
              <Button
                type="submit"
                primary
                label={!!schedule ? 'Save' : 'Create'}
              />
            </Field>
          </form>
        )}
      </Formik>
    )}
  </Mutation>
);

EditDetails.fragments = fragments;

export default EditDetails;
