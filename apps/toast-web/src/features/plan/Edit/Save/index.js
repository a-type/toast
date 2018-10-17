import React from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'fraql';
import { Form, Select, Button, Field } from 'components/generic';
import { Link, HelpText } from 'components/typeset';
import { Formik } from 'formik';
import Preview from './Preview';
import { path } from 'ramda';

const ProcessPlan = gql`
  mutation ProcessPlan($strategy: PlanStrategy!) {
    processPlan(strategy: $strategy) {
      ${Preview.fragments.plan}
    }
  }
`;

const GetPlan = gql`
  query GetPlan {
    me {
      group {
        plan {
          ${Preview.fragments.plan}
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
  state = {
    value: null,
  };

  render() {
    return (
      <Query query={GetPlan}>
        {({ data, loading, error }) => {
          const plan = path(['me', 'group', 'plan'], data);

          return (
            <React.Fragment>
              <Mutation mutation={ProcessPlan}>
                {mutate => (
                  <Field label="Plan strategy" required>
                    <Select
                      onChange={val => {
                        mutate({ variables: { strategy: val.value } });
                        this.setState({ value: val });
                      }}
                      value={this.state.value}
                      name="strategy"
                      options={options}
                    />
                  </Field>
                )}
              </Mutation>
              {this.state.value && (
                <HelpText spaceBelow="lg">
                  {strategyDescriptions[this.state.value.value]}
                </HelpText>
              )}
              {plan && (
                <React.Fragment>
                  <Preview plan={plan} />
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
