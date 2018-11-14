import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Formik } from 'formik';
import { Field, Input, Button, Form, Select } from 'components/generic';
import { Schedule } from 'generated/schema';
import { Day } from 'types/Day';

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
          defaultServings: schedule.defaultServings,
          groceryDay: schedule.groceryDay,
        }}
        onSubmit={async values => {
          await mutate({
            variables: {
              details: {
                defaultServings: values.defaultServings,
                groceryDay: parseInt(values.groceryDay, 10),
              },
            },
          });
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
            <Field label="What day can you normally buy groceries?" required>
              <Select
                value={values.groceryDay}
                name="groceryDay"
                onChange={handleChange}
              >
                {new Array(7).fill(null).map((_, idx) => (
                  <option value={idx} key={idx}>
                    {Day[idx]}
                  </option>
                ))}
              </Select>
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
