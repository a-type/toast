import React from 'react';
import { Typography } from '@material-ui/core';

export default ({ servings }) => {
  return (
    <Typography variant="body1" gutterBottom>
      <span>Servings: {servings}</span>
    </Typography>
  );
};
