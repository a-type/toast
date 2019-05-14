import React, { FC } from 'react';
import { Wave } from './components';

const colors = ['dark', 'negative', 'brand'];

export const BackdropArt: FC<{
  fade?: boolean;
  [propName: string]: any;
}> = ({ fade, ...props }) => {
  const [factor, setFactor] = React.useState(Math.random());

  const artContent = (
    <>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="var(--color-positive-light)"
      />
      {colors.map((color, idx) => (
        <Wave
          color={color}
          scale={1 + Math.abs(4 - idx) * (0.4 + 0.2 * factor)}
          factor={factor}
          key={idx}
        />
      ))}
    </>
  );

  return (
    <svg
      viewBox="0 0 10 10"
      css={{
        width: '100%',
        height: '100%',
        overflowY: 'hidden',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
      }}
      preserveAspectRatio="xMidYMid slice"
      {...props}
    >
      <defs>
        <linearGradient
          id="opacityGradient"
          y1="100%"
          x1="50%"
          y2="0%"
          x2="50%"
        >
          <stop offset="0" stop-color="black" />
          <stop offset="0.45" stop-color="black" />
          <stop offset="0.6" stop-color="white" />
          <stop offset="1" stop-color="white" />
        </linearGradient>
        <mask id="opacityMask" x="0" y="0" width="100%" height="100%">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#opacityGradient)"
          />
        </mask>
      </defs>
      {fade ? <g mask="url(#opacityMask)">{artContent}</g> : artContent}
    </svg>
  );
};

export default BackdropArt;
