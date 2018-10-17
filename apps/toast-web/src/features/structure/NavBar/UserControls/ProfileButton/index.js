import React from 'react';
import { Loader, Tip, Button } from 'components/generic';
import { Avatar, LinkStack } from './components';
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
    const { user } = this.props;

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
    const { user } = this.props;

    return (
      <Tip.Toggle tipContent={this.renderTipContent()}>
        {({ ref, onClick }) => (
          <Button.Icon name="view-more" innerRef={ref} onClick={onClick} />
        )}
      </Tip.Toggle>
    );
  }
}

export default () => (
  <Consumer>{({ user }) => <InnerSelfLink user={user} />}</Consumer>
);
