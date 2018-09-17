import React from 'react';
import { Loader, Tip } from 'components/generic';
import { Icon, LinkStack } from './components';
import { Link } from 'components/typeset';
import auth from 'services/auth';
import { Consumer } from 'features/auth/TokenContext';
import { path } from 'ramda';

class InnerSelfLink extends React.Component {
  login = () => {
    auth.login();
  };

  logout = () => {
    auth.logout();
  };

  renderTipContent = () => {
    const { user, isLoggedIn } = this.props;

    return (
      <LinkStack>
        <Link to={`/users/${user.sub}`}>Profile</Link>
        <Link onClick={this.logout}>Log out</Link>
      </LinkStack>
    );
  };

  render() {
    const { isLoggedIn, user } = this.props;

    if (!isLoggedIn) {
      return <Link onClick={this.login}>Log in / Sign up</Link>;
    }

    return (
      <Tip.Toggle tipContent={this.renderTipContent()}>
        {({ ref, onClick }) => (
          <Icon
            avatarUrl={path(['picture'], user)}
            onClick={onClick}
            innerRef={ref}
          />
        )}
      </Tip.Toggle>
    );
  }
}

export default () => (
  <Consumer>
    {({ user, isLoggedIn }) => (
      <InnerSelfLink user={user} isLoggedIn={isLoggedIn} />
    )}
  </Consumer>
);
