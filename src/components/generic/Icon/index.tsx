import * as React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import icons from './Toast2.min.svg';

export type IconName =
  | 'beach'
  | 'calendar-delete'
  | 'calendar-plus'
  | 'calendar'
  | 'check-list'
  | 'chef-toque'
  | 'copybook'
  | 'delete-button'
  | 'draft'
  | 'edit'
  | 'expand-arrow'
  | 'green-check-mark'
  | 'heart-outline'
  | 'heart'
  | 'image'
  | 'index'
  | 'link'
  | 'list-view'
  | 'login'
  | 'microwave'
  | 'more'
  | 'next-page'
  | 'plus-math'
  | 'run'
  | 'sand-timer'
  | 'search'
  | 'skip-this-track'
  | 'star'
  | 'three-dots-symbol'
  | 'timer-2'
  | 'timer'
  | 'unavailable-cloud'
  | 'view-more'
  | 'waiter'
  | 'walk'
  | 'warn';

export type IconStyleProps = {
  iconGroup?: 'Toast2' | 'Food';
  size?: string;
  color?: string;
  onClick?(event: React.MouseEvent<HTMLElement>): void;
  rotation?: number;
};

export type IconProps = IconStyleProps & {
  name: IconName;
  className?: string;
};

const Svg = styled.svg`
  display: inline-block;
  width: 100%;
  height: 100%;
`;

const Icon = styled<IconStyleProps, 'i'>('i')`
  fill: ${props => props.color || 'currentColor'};
  transform: ${props =>
    props.rotation ? `rotate(${props.rotation}deg)` : 'none'};
  display: inline-block;
  width: ${props => (props.size ? props.size : '1em')};
  height: ${props => (props.size ? props.size : '1em')};
  vertical-align: -0.1em;
  transition: 0.2s ease transform;
  position: relative;
`;

export default ({ name, className, ...rest }: IconProps) => (
  <Icon {...rest} className={classnames(`icon-${name}`, className)}>
    <Svg>
      <use xlinkHref={`${icons}#icon-${name}`} />
    </Svg>
  </Icon>
);
