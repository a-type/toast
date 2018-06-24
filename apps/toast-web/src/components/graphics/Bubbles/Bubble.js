import React from 'react';

export default ({ show, colorOptions }) => {
  const colorIdx = Math.floor(Math.random() * colorOptions.length);

  if (!show) {
    return (
      <div
        className="bubble"
        style={{
          backgroundColor: `var(--color-${colorOptions[colorIdx]})`,
          borderRadius: '100%',
          position: 'absolute',
          transition: '0.2s ease-in-out all',
          top: '50%',
          left: '50%',
          width: 0,
          height: 0,
        }}
      />
    );
  }

  const size = Math.random() * 2 + 4;
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  return (
    <div
      className="bubble"
      style={{
        backgroundColor: `var(--color-${colorOptions[colorIdx]})`,
        borderRadius: '100%',
        position: 'absolute',
        transition: '0.2s ease-in-out all',
        top: `${y}%`,
        left: `${x}%`,
        width: `${size}vh`,
        height: `${size}vh`,
      }}
    />
  );
};
