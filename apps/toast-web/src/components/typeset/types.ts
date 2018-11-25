import * as React from 'react';
import { Size } from 'theme';
import { StyledComponentClass } from 'styled-components';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  spaceBelow?: Size | string;
  name?: string;
}

export interface HeadingSkeletonProps extends HeadingProps {
  size?: number;
}

export interface HeadingWithSkeleton
  extends StyledComponentClass<HeadingProps, {}> {
  Skeleton?: React.StatelessComponent<HeadingSkeletonProps>;
}
