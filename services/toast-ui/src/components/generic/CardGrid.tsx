import React, { FC } from 'react';
import { Grid } from '@material-ui/core';

export interface CardGridProps {
  small?: boolean;
}

export const CardGrid: FC<CardGridProps> = ({ children, small = false }) => {
  return (
    <Grid container spacing={2}>
      {React.Children.map(children, (child, idx) => (
        <Grid
          item
          key={idx}
          xs={small ? 6 : 12}
          md={small ? 3 : 6}
          lg={small ? 2 : 4}
        >
          {child}
        </Grid>
      ))}
    </Grid>
  );
};

export default CardGrid;
