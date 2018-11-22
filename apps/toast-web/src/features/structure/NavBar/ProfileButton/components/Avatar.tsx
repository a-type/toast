import React from 'react';
import styled from 'styled-components';
import { Icon } from 'components/generic';

const Circle = styled<{ avatarUrl: string }, 'div'>('div')`
  border-radius: 100%;
  background: var(--color-white);
  display: flex;
  width: 38px;
  height: 38px;
  font-size: 18px;
  cursor: pointer;

  background-image: url(${props => props.avatarUrl});
  background-position: center;
  background-size: cover;
`;

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  avatarUrl: string;
}

const Avatar = React.forwardRef(
  ({ onClick, avatarUrl, ...rest }: AvatarProps, ref) => (
    <Circle avatarUrl={avatarUrl} onClick={onClick} ref={ref as any} {...rest}>
      {!avatarUrl && <Icon name="profile-picture" />}
    </Circle>
  ),
);

export default Avatar;
