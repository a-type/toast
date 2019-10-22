import * as React from 'react';
import EditForm from './EditForm';
import { GroceryDayEventCreator } from './eventCreator/GroceryDayEventCreator';
import useGroceryDay from 'hooks/features/useGroceryDay';
import { Box, Grid } from '@material-ui/core';

export const GroceryDay: React.SFC<{}> = ({}) => {
  const {
    data: { index },
    loading,
    error,
  } = useGroceryDay();

  if (loading || error) {
    return null;
  }

  return (
    <Grid container spacing={2}>
      <Grid item lg={4} md={6} sm={12} xs={12}>
        <EditForm groceryDay={index || 0} />
      </Grid>
      <Grid item lg={8} md={6} sm={12} xs={12}>
        <GroceryDayEventCreator dayIndex={index || 0} />
      </Grid>
    </Grid>
  );
};
