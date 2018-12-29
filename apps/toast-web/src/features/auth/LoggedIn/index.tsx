import React from 'react';
import { Loader } from 'components/generic';
import auth from 'services/auth';

export default class extends React.Component {
  componentDidMount() {
    if (/access_token|id_token|error/.test(window.location.hash)) {
      auth.handleAuthentication();
    }
  }

  render() {
    return <Loader size="92px" />;
  }
}
