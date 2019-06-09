import React, { SFC, HTMLAttributes } from 'react';
import { Card, CardMedia, CardHeader, makeStyles } from '@material-ui/core';
import { TextSkeleton } from './Text';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey[100],
    width: '100%',
    height: 0,
    paddingTop: '56.25%',
  },
  cardHeader: {
    alignSelf: 'flex-start',
  },
}));

export const CardSkeleton: SFC<
  HTMLAttributes<HTMLDivElement> & { variant?: 'full' | 'compact' }
> = props => {
  const classes = useStyles(props);

  return (
    <Card className={classes.card}>
      {props.variant !== 'compact' && <CardMedia className={classes.media} />}
      <CardHeader className={classes.cardHeader} title={<TextSkeleton />} />
    </Card>
  );
};
