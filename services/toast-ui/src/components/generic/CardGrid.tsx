import React, { FC } from 'react';
import { Grid } from '@material-ui/core';

export interface CardGridProps {}

export const CardGrid: FC<CardGridProps> = ({ children }) => {
  return (
    <Grid container spacing={2}>
      {React.Children.map(children, (child, idx) => (
        <Grid item key={idx} xs={12}>
          {child}
        </Grid>
      ))}
    </Grid>
  );
};

export default CardGrid;
