// @flow

import React from 'react';

type LoginState = {
  email: string,
  password: string,
};

export default class LoginStateProvider extends React.PureComponent<
  *,
  LoginState,
> {
  state = {
    email: '',
    password: '',
  };

  handleEmailChanged = email => this.setState({ email });
  handlePasswordChanged = password => this.setState({ password });

  render() {
    return this.props.children({
      ...this.state,
      onEmailChanged: this.handleEmailChanged,
      onPasswordChanged: this.handlePasswordChanged,
    });
  }
}
