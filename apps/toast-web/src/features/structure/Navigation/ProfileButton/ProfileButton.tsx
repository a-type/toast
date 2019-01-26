import React from 'react';
import { Tip, Button } from 'components/generic';
import { Avatar, LinkStack } from './components';
import { Link } from 'components/typeset';
import { Consumer } from 'features/auth/TokenContext';
import { path } from 'ramda';
import LoginButton from './LoginButton';
import { IsLoggedIn } from 'features/auth/gates';
import firebase from 'firebase';
import browserHistory from 'browserHistory';

interface InnerSelfLinkProps {
  user: firebase.User;
}

class InnerSelfLink extends React.Component<InnerSelfLinkProps> {
  logout = async () => {
    await firebase.auth().signOut();
    browserHistory.push('/');
  };

  renderTipContent = () => {
    const { user } = this.props;

    if (!user) {
      return <LoginButton />;
    }

    return (
      <LinkStack>
        <Avatar avatarUrl={path(['photoURL'], user)} />
        <Link.Clear to={`/users/${user.uid}`}>
          <Button.Ghost>Profile</Button.Ghost>
        </Link.Clear>
        <Button.Ghost onClick={this.logout}>Log out</Button.Ghost>
      </LinkStack>
    );
  };

  render() {
    const { user } = this.props;

    return (
      <Tip.Toggle tipContent={this.renderTipContent()}>
        {({ ref, onClick }) => (
          <IsLoggedIn
            fallback={
              <Button.Icon
                name="three-dots-symbol"
                ref={ref}
                onClick={onClick}
              />
            }
          >
            <Avatar
              avatarUrl={path(['photoURL'], user)}
              ref={ref}
              onClick={onClick}
            />
          </IsLoggedIn>
        )}
      </Tip.Toggle>
    );
  }
}

export default () => (
  <Consumer>{({ user }) => <InnerSelfLink user={user} />}</Consumer>
);
