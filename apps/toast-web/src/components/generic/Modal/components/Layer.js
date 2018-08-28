import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  pointer-events: none;

  & > * {
    pointer-events: initial;
  }
`;

export default () => <Styles id="modalLayer" />;
