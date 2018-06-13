// @flow
import React, { type Node } from 'react';

export default ({
  imageSrc,
  children,
}: {
  imageSrc: string,
  children?: Node,
}) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      backgroundImage: `url(${imageSrc})`,
      height: 'calc(var(--rhythm) * 20)',
      backgroundSize: 'cover',
      zIndex: -1000,
    }}
  >
    {children}
  </div>
);
