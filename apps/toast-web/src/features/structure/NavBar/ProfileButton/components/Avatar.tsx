import React from 'react';
import styled from 'styled-components';
import { Icon } from 'components/generic';

const Circle = styled<{ avatarUrl: string }, 'div'>('div')`
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

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  avatarUrl: string;
}

const Avatar: React.SFC<AvatarProps> = ({ onClick, avatarUrl, ...rest }) => (
  <Circle avatarUrl={avatarUrl} onClick={onClick} {...rest}>
    {!avatarUrl && <Icon name="profile-picture" />}
  </Circle>
);

export default Avatar;
