import React from 'react';
import { Tip, Button } from 'components/generic';
import { Avatar, LinkStack } from './components';
import { Link } from 'components/typeset';
import auth from 'services/auth';
import { Consumer } from 'features/auth/TokenContext';
import { path } from 'ramda';
import LoginButton from './LoginButton';
import { IsLoggedIn } from 'features/auth/gates';

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

  renderAvatar = () => {
    const { user } = this.props;
    return <Avatar avatarUrl={path(['picture'], user)} />;
  };

  renderTipContent = () => {
    const { user } = this.props;

    if (!user) {
      return <LoginButton />;
    }

    return (
      <LinkStack>
        {this.renderAvatar()}
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
          <IsLoggedIn
            fallback={
              <Button.Icon
                name="three-dots-symbol"
                ref={ref}
                onClick={onClick}
              />
            }
          >
            {this.renderAvatar()}
          </IsLoggedIn>
        )}
      </Tip.Toggle>
    );
  }
}

export default () => (
  <Consumer>{({ user }) => <InnerSelfLink user={user} />}</Consumer>
);
