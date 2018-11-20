import * as React from 'react';
import { Wave } from './components';
import { cold } from 'react-hot-loader';

const colors = ['dark', 'negative', 'brand'];

const BackdropArt = () => {
  const [factor, setFactor] = React.useState(Math.random());

  return (
    <svg
      viewBox="0 0 10 10"
      style={{
        width: '100%',
        height: '100%',
        background: 'var(--color-positive-light)',
        overflowY: 'hidden',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
      }}
      preserveAspectRatio="xMidYMid slice"
    >
      {colors.map((color, idx) => (
        <Wave
          color={color}
          scale={1 + Math.abs(4 - idx) * (0.4 + 0.2 * factor)}
          factor={factor}
          key={idx}
        />
      ))}
    </svg>
  );
};

export default cold(BackdropArt);
