import * as React from 'react';
import AcceptGroupInvitationMutation from './AcceptGroupInvitationMutation';
import { withRouter, RouteComponentProps } from 'react-router-dom';

export interface JoinProps {
  invitationKey: string;
}

const InnerJoin: React.SFC<{ mutate: any } & RouteComponentProps> = ({
  history,
  mutate,
}) => {
  React.useEffect(
    async () => {
      await mutate();
      history.push('/');
    },
    [
      /* only on mount */
    ],
  );

  return <div>Joining the group...</div>;
};

const RoutedInnerJoin = withRouter(InnerJoin);

const Join: React.SFC<JoinProps> = ({ invitationKey }) => (
  <AcceptGroupInvitationMutation variables={{ id: invitationKey }}>
    {mutate => <RoutedInnerJoin mutate={mutate} />}
  </AcceptGroupInvitationMutation>
);

export default Join;
