import React from 'react';
import Card from './Card';
import styled from 'styled-components';

export default props => (
  <Card
    ingredient={{
      name: new Array(Math.floor(Math.random() * 5 + 5)).fill(' '),
    }}
    style={{ opacity: 0.5 }}
  />
);
