import React from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'fraql';
import { Form, Select, Button, Field } from 'components/generic';
import { Link } from 'components/typeset';
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
export default class extends React.Component {
  state = {
    value: options[0],
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
