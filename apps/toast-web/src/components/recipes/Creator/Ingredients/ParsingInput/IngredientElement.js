import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.span`
  border-bottom: 1px dotted
    ${props => {
      switch (props.type) {
        case 'ingredient':
          return 'var(--color-brand)';
        case 'unit':
          return 'var(--color-positive-dark)';
        default:
          return 'var(--color-positive)';
      }
    }};
`;

export default props => <Wrapper type={props.type}>{props.children}</Wrapper>;
