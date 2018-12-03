import * as React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import icons from './Toast2.min.svg';

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

const Svg = styled.svg`
  display: inline-block;
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: -0.1em;
`;

const Icon = styled<IconStyleProps, 'i'>('i')`
  fill: ${props => props.color || 'currentColor'};
  transform: ${props =>
    props.rotation ? `rotate(${props.rotation}deg)` : 'none'};
  display: inline-block;
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: -0.1em;
  transition: 0.2s ease transform;
`;

export default ({ name, className, ...rest }: IconProps) => (
  <Icon {...rest} className={classnames(`icon-${name}`, className)}>
    <Svg>
      <use xlinkHref={`${icons}#icon-${name}`} />
    </Svg>
  </Icon>
);
