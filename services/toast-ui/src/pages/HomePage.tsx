import React, { FC } from 'react';
import { makeStyles, Theme, Container, Typography } from '@material-ui/core';
import { Feed } from 'components/features/Feed';

export interface HomePageProps {}

const useStyles = makeStyles<Theme, HomePageProps>(theme => ({}));

export const HomePage: FC<HomePageProps> = props => {
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
