import React from 'react';
import Login from 'components/auth/AdaptiveAuthForm';
import Layout from 'components/generic/layouts/SingleCenterContent';

export default class LoginPage extends React.PureComponent {
  handleLogin = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <Layout>
        <Login onLogin={this.handleLogin} />
      </Layout>
    );
  }
}
