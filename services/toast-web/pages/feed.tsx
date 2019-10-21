import React from 'react';
import { makeStyles, Theme, Container, Typography } from '@material-ui/core';
import { Feed } from 'components/feed/Feed';
import { NextPage } from 'next';
import { ensureLoggedIn } from 'lib/auth';

export interface FeedPageProps {}

const useStyles = makeStyles<Theme, FeedPageProps>(theme => ({}));

const FeedPage: NextPage<FeedPageProps> = props => {
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

FeedPage.getInitialProps = async ctx => {
  await ensureLoggedIn(ctx);
  return {};
};

export default FeedPage;
