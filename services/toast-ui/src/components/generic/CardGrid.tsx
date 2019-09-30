import React, { FC } from 'react';
import { Grid } from '@material-ui/core';

export interface CardGridProps {
  highlightedItems?: number[];
}

export const CardGrid: FC<CardGridProps> = ({
  children,
  highlightedItems = [],
}) => {
  return (
    <Grid container spacing={2}>
      {React.Children.map(children, (child, idx) => {
        const isHighlighted = highlightedItems.includes(idx);
        return (
          <Grid
            item
            key={idx}
            xs={isHighlighted ? 12 : 6}
            sm={isHighlighted ? 12 : 6}
            md={isHighlighted ? 8 : 4}
            lg={isHighlighted ? 8 : 4}
            xl={isHighlighted ? 6 : 2}
          >
            {child}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CardGrid;
