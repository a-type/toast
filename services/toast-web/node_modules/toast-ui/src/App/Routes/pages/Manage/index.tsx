import React from 'react';
import { IsAdmin } from 'features/auth/gates';
import { Typography, Container } from '@material-ui/core';

export default class ManagePage extends React.Component {
  render() {
    return (
      <Container>
        <IsAdmin>TODO</IsAdmin>
      </Container>
    );
  }
}
