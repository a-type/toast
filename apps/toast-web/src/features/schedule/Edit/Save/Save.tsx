import * as React from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Select, Button, Field } from 'components/generic';
import { HelpText } from 'components/typeset';
import { path, pathOr } from 'ramda';
import { Preview } from 'features/plan';
import { cold } from 'react-hot-loader';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

const ProcessSchedule = gql`
  mutation ProcessSchedule($strategy: ScheduleStrategy!) {
    setScheduleStrategy(strategy: $strategy) {
      id
      strategy
    }
  }
`;

const GetSchedule = gql`
  query GetSchedule {
    schedule {
      id
      strategy
    }
  }
`;

const strategyDescriptions = {
  BASIC: 'Cook whenever you have time, otherwise skip the meal.',
  PREP:
    "When you've got some time to spare, cook a larger, simpler meal and save the leftovers.",
  BIG_PREP:
    "Like Prep, but instead of spreading out meal prep over the week, you'll just be cooking one or two big meals early and freezing the leftovers.",
};

const ScheduleEditSave: React.SFC<RouteComponentProps> = ({ history }) => {
  const [strategy, setStrategy] = React.useState('BASIC');

  return (
    <Query query={GetSchedule}>
      {({ data, loading, error }) => {
        const schedule = path(['schedule'], data);
        const defaultStrategy = pathOr(strategy, ['strategy'], schedule);

        return (
          <React.Fragment>
            <Field label="Plan strategy" required>
              <Select
                onChange={ev => {
                  setStrategy(ev.target.value);
                }}
                value={strategy || defaultStrategy}
                name="strategy"
              >
                <option value="BASIC">Basic</option>
                <option value="PREP">Prep</option>
              </Select>
            </Field>

            {strategy && (
              <HelpText spaceBelow="lg">
                {strategyDescriptions[strategy]}
              </HelpText>
            )}
            {schedule && (
              <Mutation mutation={ProcessSchedule}>
                {mutate => (
                  <div>
                    <Button
                      primary
                      margin={{ bottom: 'large' }}
                      onClick={async () => {
                        await mutate({
                          variables: { strategy: strategy || defaultStrategy },
                        });
                        history.push('/plan');
                      }}
                      label="Start planning"
                    />
                    <Preview strategy={strategy || defaultStrategy} />
                    <Button
                      color="status-ok"
                      onClick={async () => {
                        await mutate({
                          variables: { strategy: strategy || defaultStrategy },
                        });
                        history.push('/plan');
                      }}
                      label="Start planning"
                    />
                  </div>
                )}
              </Mutation>
            )}
          </React.Fragment>
        );
      }}
    </Query>
  );
};

export default cold(withRouter(ScheduleEditSave));
