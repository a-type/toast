import * as React from 'react';
import Join from 'features/groups/Join';
import { parse } from 'query-string';
import { RouteComponentProps } from 'react-router';

const JoinGroupPage: React.SFC<RouteComponentProps> = ({ location }) => {
  const key = parse(location.search).key as string;
  return <Join invitationKey={key} />;
};

export default JoinGroupPage;
