import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

const Icon = styled.i`
  font-style: normal;
  font-family: font_icons8;
  font-size: ${props => props.size || 'inherit'};
  color: ${props => props.color || 'inherit'};
`;

export default ({ name, className, ...rest }) => (
  <Icon {...rest} className={classnames(`icons8-${name}`, className)} />
);
