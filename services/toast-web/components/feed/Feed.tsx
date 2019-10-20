import React, { FC } from 'react';
import { makeStyles, Theme, Typography } from '@material-ui/core';
import { useFeed, FeedEdge } from 'hooks/features/useFeed';
import CardGrid from 'components/CardGrid';
import { Loader } from 'components/Loader';
import { pathOr } from 'ramda';
import { FeedCard } from './FeedCard';

export interface FeedProps {}

const useStyles = makeStyles<Theme, FeedProps>(theme => ({}));

export const Feed: FC<FeedProps> = props => {
  const classes = useStyles(props);
  const {} = props;

  const { data, loading } = useFeed();

  if (loading) {
    return <Loader />; // TODO skeleton
  }

  const feed = pathOr([], ['feed', 'edges'], data) as FeedEdge[];

  return (
    <CardGrid>
      {feed.map(edge => (
        <FeedCard feedEdge={edge} key={edge.node.recipe.id} />
      ))}
      {!feed.length && <Empty />}
    </CardGrid>
  );
};

const useEmptyStyles = makeStyles<Theme, {}>(theme => ({
  root: {
    textAlign: 'center',
    color: theme.palette.grey[900],
  },
}));

const Empty: FC = () => {
  const classes = useEmptyStyles({});

  return (
    <Typography className={classes.root}>
      You don't have any activity yet. Follow chefs or start meal planning to
      get started!
    </Typography>
  );
};
