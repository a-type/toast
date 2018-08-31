import React from 'react';
import Login from 'features/auth/AdaptiveAuthForm';
import { SingleColumn } from 'components/layouts';

export default class LoginPage extends React.PureComponent {
  handleLogin = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <SingleColumn>
        <SingleColumn.Content>
          <Login onLogin={this.handleLogin} />
        </SingleColumn.Content>
      </SingleColumn>
    );
  }
}
