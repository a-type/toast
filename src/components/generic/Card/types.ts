import * as React from 'react';

export enum CardShape {
  Normal = 'normal',
  Large = 'large',
  Wide = 'wide',
}

export enum CardLayoutMode {
  Vertical,
  Horizontal,
  Compact,
}

export interface ShapedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: CardShape;
  imageSrc?: string;
  children: React.ReactNode;
  onClick?: (ev: React.MouseEvent<HTMLDivElement>) => void;
  ref?: any;
}
