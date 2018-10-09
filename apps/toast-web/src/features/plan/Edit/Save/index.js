import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'fraql';
import { Form, Select, Button, Field } from 'components/generic';
import { Formik } from 'formik';

const ProcessPlan = gql`
  mutation ProcessPlan($strategy: PlanStrategy!) {
    processPlan(strategy: $strategy) {
      id
      days {
        meals {
          availability
          actions {
            type

            ... on PlanActionEatOut {
              note
            }

            ... on PlanActionCook {
              servings
              mealType
            }

            ... on PlanActionEat {
              mealDay
              mealindex
              leftovers
            }

            ... on PlanActionReadyMade {
              note
            }
          }
        }
      }
    }
  }
`;

const options = [
  { value: 'BASIC', label: 'Basic' },
  { value: 'PREP', label: 'Prep' },
  { value: 'BIG_PREP', label: 'Big Prep' },
];
export default () => (
  <Mutation mutation={ProcessPlan}>
    {mutate => (
      <Formik
        initialValues={{ strategy: options[0] }}
        onSubmit={({ strategy }) =>
          mutate({ variables: { strategy: strategy.value } })
        }
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <Form onSubmit={handleSubmit}>
            <Field label="Plan strategy" required>
              <Select
                onChange={val => setFieldValue('strategy', val)}
                value={values.strategy}
                name="strategy"
                options={options}
              />
            </Field>
            <Field>
              <Button type="submit">Create</Button>
            </Field>
          </Form>
        )}
      </Formik>
    )}
  </Mutation>
);
