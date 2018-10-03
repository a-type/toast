import React from 'react';
import gql from 'fraql';
import { Query } from 'react-apollo';
import EditDetails from './EditDetails';
import EditAvailability from './EditAvailability';
import { pathOr } from 'ramda';
import { Stages } from 'components/generic';

const PlanQuery = gql`
  query Plan {
    me {
      group {
        plan {
          id
          ${EditDetails.fragments.plan}
          ${EditAvailability.fragments.plan}
        }
      }
    }
  }
`;

export default () => (
  <Query query={PlanQuery}>
    {({ data, loading, error }) => {
      if (loading || error) {
        return null;
      }

      const plan = pathOr(null, ['me', 'group', 'plan'], data);

      return (
        <Stages completedStage={1} stage={1}>
          <Stages.Stage stageIndex={0} title="Plan Basics">
            <EditDetails plan={plan} />
          </Stages.Stage>
          {plan && (
            <Stages.Stage stageIndex={1} title="Your Schedule">
              <EditAvailability plan={plan} />
            </Stages.Stage>
          )}
        </Stages>
      );
    }}
  </Query>
);
