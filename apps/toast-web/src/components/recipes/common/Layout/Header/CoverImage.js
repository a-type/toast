// @flow
import React, { type Node } from 'react';
import Bubbles from 'components/graphics/Bubbles';

export default ({
  imageSrc,
  children,
}: {
  imageSrc: string,
  children?: Node,
}) =>
  imageSrc ? (
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
  ) : (
    <Bubbles
      backgroundColor="brand-light"
      bubbleColors={['positive', 'negative']}
      bubbleCount={10}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 'calc(var(--rhythm) * 20)',
        backgroundSize: 'cover',
        zIndex: -1000,
      }}
    >
      {children}
    </Bubbles>
  );
