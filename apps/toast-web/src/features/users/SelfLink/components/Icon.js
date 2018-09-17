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

  background-image: url(${props => props.avatarUrl});
  background-position: center;
  background-size: cover;

  & > * {
    margin: auto;
  }
`;

export default ({ innerRef, onClick, avatarUrl, ...rest }) => (
  <Circle avatarUrl={avatarUrl} innerRef={innerRef} onClick={onClick} {...rest}>
    {!avatarUrl && <Icon name="profile-picture" />}
  </Circle>
);
