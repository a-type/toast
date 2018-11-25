import * as React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

export type IconStyleProps = {
  iconGroup?: 'Toast2' | 'Food';
  size?: string;
  color?: string;
  onClick?(event: React.MouseEvent<HTMLElement>): void;
  rotation?: number;
};

export type IconProps = IconStyleProps & {
  name: string;
  className?: string;
};

const Icon = styled<IconStyleProps, 'i'>('i')`
  font-style: normal;
  font-family: ${props => props.iconGroup || 'Toast2'};
  font-size: ${props => props.size || 'inherit'};
  color: ${props => props.color || 'inherit'};
  transform: ${props =>
    props.rotation ? `rotate(${props.rotation}deg)` : 'none'};
`;

export default ({ name, className, ...rest }: IconProps) => (
  <Icon {...rest} className={classnames(`icons8-${name}`, className)} />
);
