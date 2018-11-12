import React from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Form, Select, Button, Field } from 'components/generic';
import { Link, HelpText } from 'components/typeset';
import { Formik } from 'formik';
import { path, pathOr } from 'ramda';

const ProcessPlan = gql`
  mutation ProcessPlan($strategy: PlanStrategy!) {
    setPlanStrategy(strategy: $strategy) {
      id
      strategy
    }
  }
`;

const GetPlan = gql`
  query GetPlan {
    me {
      group {
        plan {
          id
          strategy
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

const strategyDescriptions = {
  BASIC: 'Cook whenever you have time, otherwise skip the meal.',
  PREP:
    "When you've got some time to spare, cook a larger, simpler meal and save the leftovers.",
  BIG_PREP:
    "Like Prep, but instead of spreading out meal prep over the week, you'll just be cooking one or two big meals early and freezing the leftovers.",
};

export default class extends React.Component {
  render() {
    return (
      <Query query={GetPlan}>
        {({ data, loading, error }) => {
          const plan = path(['me', 'group', 'plan'], data);
          const strategy = pathOr(null, ['strategy'], plan);

          return (
            <React.Fragment>
              <Mutation mutation={ProcessPlan}>
                {mutate => (
                  <Field label="Plan strategy" required>
                    <Select
                      onChange={ev => {
                        mutate({ variables: { strategy: ev.target.value } });
                      }}
                      value={strategy}
                      name="strategy"
                    >
                      <option value="BASIC">Basic</option>
                      <option value="PREP">Prep</option>
                      <option value="BIG_PREP">Big prep</option>
                    </Select>
                  </Field>
                )}
              </Mutation>
              {strategy && (
                <HelpText spaceBelow="lg">
                  {strategyDescriptions[strategy]}
                </HelpText>
              )}
              {plan && (
                <React.Fragment>
                  {/* <Preview plan={plan} /> */}
                  <Link.Clear to="/plan">
                    <Button>Start planning</Button>
                  </Link.Clear>
                </React.Fragment>
              )}
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}
