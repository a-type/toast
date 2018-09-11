import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Loader, Tip } from 'components/generic';
import { Icon, LinkStack } from './components';
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

  logout = () => {
    auth.logout();
  };

  renderTipContent = () => {
    const { data } = this.props;

    return (
      <LinkStack>
        <Link to={`/users/${data.me.id}`}>Profile</Link>
        <Link onClick={this.logout}>Log out</Link>
      </LinkStack>
    );
  };

  render() {
    const { data, loading, error, refetch } = this.props;

    if (error || !data.me) {
      return <Link to="/login">Log in / Sign up</Link>;
    }

    if (loading) {
      return <Loader size="1em" />;
    }

    return (
      <Tip.Toggle tipContent={this.renderTipContent()}>
        {({ ref, onClick }) => <Icon onClick={onClick} innerRef={ref} />}
      </Tip.Toggle>
    );
  }
}

export default () => (
  <Query query={Me}>{result => <InnerSelfLink {...result} />}</Query>
);
