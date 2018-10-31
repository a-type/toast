import React from 'react';
import gql from 'fraql';
import { Query } from 'react-apollo';
import EditDetails from './EditDetails';
import EditAvailability from './EditAvailability';
import Save from './Save';
import { pathOr } from 'ramda';
import { Stages } from 'components/generic';
import { Content } from 'components/layouts';
import { Background } from 'components/generic';

const PlanQuery = gql`
  query Plan {
    plan {
      id
      ${EditDetails.fragments.plan}
      ${EditAvailability.fragments.plan}
    }
  }
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
          backgroundKey="planEditBackground"
        />
        <Content mode="overlay">
          <Query query={PlanQuery}>
            {({ data, loading, error, refetch }) => {
              if (loading || error) {
                return null;
              }

              const plan = pathOr(null, ['me', 'group', 'plan'], data);

              return (
                <Stages
                  completedStage={!!plan ? 1 : 0}
                  onStageChanged={this.setStage}
                  stage={this.state.stage}
                >
                  <Stages.Stage stageIndex={0} title="Plan Basics">
                    <EditDetails plan={plan} onSave={refetch} />
                  </Stages.Stage>
                  {plan && (
                    <React.Fragment>
                      <Stages.Stage stageIndex={1} title="Your Schedule">
                        <EditAvailability plan={plan} />
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
        </Content>
      </React.Fragment>
    );
  }
}
