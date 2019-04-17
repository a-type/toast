import React, { FC } from 'react';

export const Loader: FC<{ size?: string; color?: string }> = ({
  size,
  color,
}) => {
  return <div>Loading</div>;
};

export default Loader;
