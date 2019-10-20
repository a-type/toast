import React, { FC } from 'react';
import { makeStyles, Theme, Box, Typography } from '@material-ui/core';
import { FeedEdge } from 'hooks/features/useFeed';
import RecipeCard from '../recipes/RecipeCard';
import { formatDistanceToNow } from 'date-fns';
import { UserLink } from '../users/UserLink';

export interface FeedCardProps {
  feedEdge: FeedEdge;
}

const useStyles = makeStyles<Theme, FeedCardProps>(theme => ({
  card: {
    marginBottom: theme.spacing(1),
  },
  time: {
    fontStyle: 'italic',
    color: theme.palette.grey[900],
  },
}));

export const FeedCard: FC<FeedCardProps> = props => {
  const classes = useStyles(props);
  const { feedEdge } = props;

  return (
    <Box>
      <RecipeCard recipe={feedEdge.node.recipe} className={classes.card} />
      <Typography variant="caption" className={classes.time}>
        {formatDistanceToNow(feedEdge.node.recipe.updatedAt)} ago
      </Typography>
      <UserLink user={feedEdge.node.recipe.author} />
    </Box>
  );
};
