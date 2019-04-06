import * as React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import icons from './Toast2.min.svg';
import foodIcons from './Food2.svg';

export type GenericIconName =
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

export type FoodIconName =
  | 'avocado'
  | 'beet'
  | 'bread'
  | 'carrot'
  | 'cheese'
  | 'cheeseburger'
  | 'cherry'
  | 'chinese-fried-rice'
  | 'croissant'
  | 'eggs'
  | 'fish-food'
  | 'food'
  | 'food-and-wine'
  | 'food-basket'
  | 'food-wrapper'
  | 'garlic'
  | 'ham'
  | 'italian-pizza'
  | 'leaf-outline'
  | 'olive'
  | 'olive-oil'
  | 'pancake'
  | 'peanuts'
  | 'pear'
  | 'pie'
  | 'piece-of-lemon-cake'
  | 'potato'
  | 'prawn'
  | 'sandwich'
  | 'sandwich-with-fried-egg'
  | 'slice-of-bread-outline'
  | 'soup-plate'
  | 'soy'
  | 'steak'
  | 'sushi'
  | 'taco'
  | 'tapas'
  | 'tomato'
  | 'vegan-food'
  | 'watermelon';

const iconGroups = {
  food: foodIcons,
  generic: icons,
};

export type IconStyleProps = React.HTMLAttributes<HTMLSpanElement> & {
  size?: string;
  color?: string;
  onClick?(event: React.MouseEvent<HTMLElement>): void;
  rotation?: number;
};

export type BaseIconProps = IconStyleProps & {
  name: string;
  className?: string;
  iconGroup?: 'generic' | 'food';
};

const Svg = styled.svg`
  display: inline-block;
  width: 100%;
  height: 100%;
`;

const IconStyles = styled<IconStyleProps, 'i'>('i')`
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

export const BaseIcon = ({
  name,
  className,
  iconGroup = 'generic',
  ...rest
}: BaseIconProps) => (
  <IconStyles {...rest} className={classnames(`icon-${name}`, className)}>
    <Svg>
      <use xlinkHref={`${iconGroups[iconGroup]}#icon-${name}`} />
    </Svg>
  </IconStyles>
);

export type IconProps = IconStyleProps & {
  name: GenericIconName;
  className?: string;
};
export const Icon = (props: IconProps) => (
  <BaseIcon {...props} iconGroup="generic" />
);

export type FoodIconProps = IconStyleProps & {
  name: FoodIconName;
  className?: string;
};
export const FoodIcon = (props: FoodIconProps) => (
  <BaseIcon {...props} iconGroup="food" />
);

export default Icon;
