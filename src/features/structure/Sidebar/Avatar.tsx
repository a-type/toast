import React from 'react';
import styled from 'styled-components';
import { Icon } from 'components/generic';

const Circle = styled<{ avatarUrl: string }, 'div'>('div')`
  border-radius: 100%;
  display: flex;
  width: 100px;
  height: 100px;
  font-size: 30px;
  cursor: pointer;
  margin: var(--spacing-lg) auto;

  background-color: var(--color-positive);
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
      {!avatarUrl && <Icon name="chef-toque" color="white" size="28px" />}
    </Circle>
  ),
);

export default Avatar;
