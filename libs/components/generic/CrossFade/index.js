import React from 'react';
import Replace from 'react-css-transition-replace';
import styled from 'styled-components';

const StyleContext = styled.div`
  & .cross-fade-leave {
    opacity: 1;
  }

  & .cross-fade-leave.cross-fade-leave-active {
    opacity: 0;
    transition: opacity ${props => props.duration / 1000}s ease-in;
  }

  & .cross-fade-enter {
    opacity: 0;
  }

  & .cross-fade-enter.cross-fade-enter-active {
    opacity: 1;
    transition: opacity ${props => props.duration / 1000}s ease-in;
  }

  & .cross-fade-height {
    transition: height ${props => props.duration / 2000}s ease-in-out;
  }
`;

export default ({ children, duration = 350 }) => (
  <StyleContext duration={duration}>
    <Replace
      transitionName="cross-fade"
      transitionEnterTimeout={duration}
      transitionLeaveTimeout={duration}
    >
      {children}
    </Replace>
  </StyleContext>
);
