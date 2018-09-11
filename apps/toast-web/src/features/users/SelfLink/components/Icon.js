import React from 'react';
import styled from 'styled-components';
import { Icon } from 'components/generic';

const Circle = styled.div`
  border-radius: 100%;
  background: var(--color-white);
  display: flex;
  width: 36px;
  height: 36px;
  font-size: 18px;
  cursor: pointer;

  & > * {
    margin: auto;
  }
`;

export default ({ innerRef, onClick }) => (
  <Circle innerRef={innerRef} onClick={onClick}>
    <Icon name="profile-picture" />
  </Circle>
);
