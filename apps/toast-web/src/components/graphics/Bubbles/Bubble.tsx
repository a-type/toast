import React from 'react';

export default ({ show, colorOptions, size, animated }) => {
  const colorIdx = Math.floor(Math.random() * colorOptions.length);

  if (!show) {
    return (
      <div
        className="bubble"
        style={{
          backgroundColor: `var(--color-${colorOptions[colorIdx]})`,
          borderRadius: '100%',
          position: 'absolute',
          transition: animated ? '0.2s ease-in-out all' : '0',
          top: '50%',
          left: '50%',
          width: 0,
          height: 0,
        }}
      />
    );
  }

  const randomSize = (Math.random() * 0.5 - 0.25 + 1) * size;
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  return (
    <div
      className="bubble"
      style={{
        backgroundColor: `var(--color-${colorOptions[colorIdx]})`,
        borderRadius: '100%',
        position: 'absolute',
        transition: animated ? '0.2s ease-in-out all' : '0',
        top: `${y}%`,
        left: `${x}%`,
        width: `${randomSize}px`,
        height: `${randomSize}px`,
      }}
    />
  );
};
