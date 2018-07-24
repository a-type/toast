import React from 'react';
import Container from './Container';
import Button from './Button';

export default () => (
  <React.Fragment>
    <Container>
      <Button>Ingredients</Button>
      <Button>Steps</Button>
    </Container>
    <div style={{ height: '64px' }} className="spacer" />
  </React.Fragment>
);
