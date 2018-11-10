import React from 'react';
import { Tip, Button } from 'components/generic';
import { Avatar, LinkStack } from './components';
import { Link } from 'components/typeset';
import auth from 'services/auth';
import { Consumer } from 'features/auth/TokenContext';
import { path } from 'ramda';
import LoginButton from './LoginButton';

interface InnerSelfLinkProps {
  user: {
    picture: string;
    sub: string;
  };
}

class InnerSelfLink extends React.Component<InnerSelfLinkProps> {
  login = () => {
    auth.login();
  };

  logout = () => {
    auth.logout();
  };

  renderTipContent = () => {
    const { user } = this.props;

    if (!user) {
      return <LoginButton />;
    }

    return (
      <LinkStack>
        <Avatar avatarUrl={path(['picture'], user)} />
        <Link.Clear to={`/users/${user.sub}`}>
          <Button.Ghost>Profile</Button.Ghost>
        </Link.Clear>
        <Button.Ghost onClick={this.logout}>Log out</Button.Ghost>
      </LinkStack>
    );
  };

  render() {
    return (
      <Tip.Toggle tipContent={this.renderTipContent()}>
        {({ ref, onClick }) => (
          <Button.Icon name="three-dots-symbol" ref={ref} onClick={onClick} />
        )}
      </Tip.Toggle>
    );
  }
}

export default () => (
  <Consumer>{({ user }) => <InnerSelfLink user={user} />}</Consumer>
);
