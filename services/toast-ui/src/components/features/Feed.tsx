import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { useFeed, FeedEdge } from 'hooks/features/useFeed';
import CardGrid from 'components/generic/CardGrid';
import { Loader } from 'components/generic/Loader';
import { pathOr } from 'ramda';
import RecipeCard from './RecipeCard';
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
    </CardGrid>
  );
};
