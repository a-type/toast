import * as React from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Field } from 'components/generic';
import { HelpText } from 'components/text';
import { path, pathOr } from 'ramda';
import { Preview } from 'features/plan';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { Button, Select } from 'grommet';
import { ScheduleStrategy } from 'generated/schema';

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

const options: {
  value: ScheduleStrategy;
  label: string;
}[] = [
  {
    value: ScheduleStrategy.BASIC,
    label: 'Basic',
  },
  {
    value: ScheduleStrategy.PREP,
    label: 'Prep',
  },
];

const ScheduleEditSave: React.SFC<RouteComponentProps> = ({ history }) => {
  const [strategy, setStrategy] = React.useState<{
    value: ScheduleStrategy;
    label: string;
  }>(null);

  return (
    <Query query={GetSchedule}>
      {({ data, loading, error }) => {
        const schedule = path(['schedule'], data);
        const defaultStrategy =
          options.find(
            opt =>
              opt.value ===
              pathOr(ScheduleStrategy.BASIC, ['strategy'], schedule),
          ) || options[0];
        const resolvedStrategyValue = strategy
          ? strategy.value
          : defaultStrategy.value;

        return (
          <React.Fragment>
            <Field label="Plan strategy" required>
              <Select
                onChange={ev => {
                  setStrategy(ev.option);
                }}
                value={strategy || defaultStrategy}
                labelKey={'label'}
                {...{ name: 'strategy' } as any}
                options={options}
              >
                {option => option.label}
              </Select>
            </Field>

            {strategy && (
              <HelpText spaceBelow="lg">
                {strategyDescriptions[strategy.value]}
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
                          variables: { strategy: resolvedStrategyValue },
                        });
                        history.push('/plan');
                      }}
                      label="Start planning"
                    />
                    <Preview strategy={resolvedStrategyValue} />
                    <Button
                      color="status-ok"
                      onClick={async () => {
                        await mutate({
                          variables: { strategy: resolvedStrategyValue },
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

export default withRouter(ScheduleEditSave);
