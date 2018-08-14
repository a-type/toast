import React from 'react';
import styled from 'styled-components';

const Icon = styled.i`
  font-style: normal;
  font-family: toast_icons;
  font-size: ${props => props.size || 'inherit'};
  color: ${props => props.color || 'inherit'};
`;

export default ({ name, ...rest }) => (
  <Icon {...rest} className={`icons8-${name}`} />
);
