import * as React from 'react';

export enum CardShape {
  Normal = 'normal',
  Large = 'large',
  Wide = 'wide',
}

export interface ShapedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  shape: CardShape;
  imageSrc?: string;
  children: React.ReactNode;
  onClick?: (ev: React.MouseEvent<HTMLDivElement>) => void;
}

export interface ShapedCardSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  shape: CardShape;
}
