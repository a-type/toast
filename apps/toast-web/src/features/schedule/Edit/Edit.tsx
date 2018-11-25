import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import EditDetails from './EditDetails';
import EditAvailability from './EditAvailability';
import Save from './Save';
import { pathOr } from 'ramda';
import { Stages } from 'components/generic';
import { Content } from 'components/layouts';
import { Background } from 'components/generic';

const ScheduleQuery = gql`
  query ScheduleQuery {
    schedule {
      id
      ...EditDetails
      ...EditAvailability
    }
  }
  ${EditDetails.fragments.schedule}
  ${EditAvailability.fragments.schedule}
`;

export default class extends React.Component {
  state = {
    stage: 0,
  };

  setStage = stage => this.setState({ stage });

  render() {
    return (
      <React.Fragment>
        <Background
          color="var(--color-brand)"
          backgroundKey="scheduleEditBackground"
        />
        <Query query={ScheduleQuery}>
          {({ data, loading, error, refetch }) => {
            if (loading || error) {
              return null;
            }

            const schedule = pathOr(null, ['schedule'], data);

            return (
              <Stages
                completedStage={!!schedule ? 1 : 0}
                onStageChanged={this.setStage}
                stage={this.state.stage}
              >
                <Stages.Stage stageIndex={0} title="Schedule Basics">
                  <EditDetails schedule={schedule} onSave={refetch} />
                </Stages.Stage>
                {schedule && (
                  <React.Fragment>
                    <Stages.Stage stageIndex={1} title="Your Schedule">
                      <EditAvailability schedule={schedule} />
                    </Stages.Stage>
                    <Stages.Stage stageIndex={2} title="Preview & Save">
                      <Save />
                    </Stages.Stage>
                  </React.Fragment>
                )}
              </Stages>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}
