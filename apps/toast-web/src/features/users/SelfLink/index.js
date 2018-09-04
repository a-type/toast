import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Loader } from 'components/generic';
import { Link } from 'components/typeset';
import auth from 'apolloClient/auth';

const Me = gql`
  query Me {
    me {
      id
      name
    }
  }
`;

class InnerSelfLink extends React.Component {
  componentDidMount() {
    auth.on(auth.eventTypes.tokenStored, () => {
      this.props.refetch();
    });
  }

  render() {
    const { data, loading, error, refetch } = this.props;

    if (error || !data.me) {
      return <Link to="/login">Log in / Sign up</Link>;
    }

    if (loading) {
      return <Loader size="1em" />;
    }

    return <Link to={`/users/${data.me.id}`}>Profile</Link>;
  }
}

export default () => (
  <Query query={Me}>{result => <InnerSelfLink {...result} />}</Query>
);
