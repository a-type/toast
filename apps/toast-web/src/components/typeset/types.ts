import { Size } from 'theme';
import { StyledComponentClass } from 'styled-components';

export interface HeadingProps {
  spaceBelow?: Size | string;
}

export interface HeadingSkeletonProps extends HeadingProps {
  size?: number;
}

export interface HeadingWithSkeleton
  extends StyledComponentClass<HeadingProps, {}> {
  Skeleton?: React.StatelessComponent<HeadingSkeletonProps>;
}
