import React from 'react';
import { H2 } from 'components/generic';

export default () => (
  <div style={{ textAlign: 'center' }}>
    <H2>Couldn't find it</H2>
    <p>
      We couldn't find a recipe that fits your search. Feel free to switch up
      your parameters and try again.
    </p>
    <b>Have a recipe in mind?</b>
    <p>Sign up and share it with us!</p>
  </div>
);
