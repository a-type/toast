import React, { FC } from 'react';
import { makeStyles, Theme, Container, Typography } from '@material-ui/core';
import { Feed } from 'components/feed/Feed';

export interface FeedPageProps {}

const useStyles = makeStyles<Theme, FeedPageProps>(theme => ({}));

const FeedPage: FC<FeedPageProps> = props => {
  const classes = useStyles(props);
  const {} = props;
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Feed
      </Typography>
      <Feed />
    </Container>
  );
};

export default FeedPage;
