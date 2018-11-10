import * as React from 'react';
import Label from './Label';
import Wrapper from './Wrapper';
import { Span } from 'components/typeset';
import { Size } from 'theme';

export interface CheckboxSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  spaceBelow?: Size;
}

const CheckboxSkeleton: React.SFC<CheckboxSkeletonProps> = ({
  size,
  ...props
}) => (
  <Wrapper {...props}>
    <Label as="div">
      <Span.Skeleton size={size} />
    </Label>
  </Wrapper>
);

export default CheckboxSkeleton;
