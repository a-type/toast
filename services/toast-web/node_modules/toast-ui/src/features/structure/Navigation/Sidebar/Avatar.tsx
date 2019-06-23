import React from 'react';
import styled from 'styled-components';
import { Icon } from 'components/generic/Icon';

const Circle = styled<{ avatarUrl: string }, 'div'>('div')`
  border-radius: 100%;
  display: flex;
  width: 24px;
  height: 24px;
  font-size: 16px;
  cursor: pointer;

  background-color: var(--color-secondary);
  background-image: url(${props => props.avatarUrl});
  background-position: center;
  background-size: cover;

  flex-shrink: 0;

  & > * {
    margin: auto;
  }
`;

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  avatarUrl: string;
}

const Avatar = React.forwardRef(
  ({ onClick, avatarUrl, ...rest }: AvatarProps, ref) => (
    <Circle avatarUrl={avatarUrl} onClick={onClick} ref={ref as any} {...rest}>
      {!avatarUrl && <Icon name="account_circle" color="white" size="28px" />}
    </Circle>
  ),
);

export default Avatar;
