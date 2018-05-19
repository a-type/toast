import React from 'react';
import styled from 'styled-components';

const Icon = styled.i`
  font-style: normal;
  font-family: toast_icons;
  font-size: 16px;
`;

export default ({ name }) => <Icon className={`icons8-${name}`} />;
