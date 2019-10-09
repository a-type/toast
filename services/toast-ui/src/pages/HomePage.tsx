import React, { FC } from 'react';
import { makeStyles, Theme, Container, Typography } from '@material-ui/core';

export interface HomePageProps {}

const useStyles = makeStyles<Theme, HomePageProps>(theme => ({}));

export const HomePage: FC<HomePageProps> = props => {
  const classes = useStyles(props);
  const {} = props;
  return (
    <Container>
      <Typography variant="h3">Home</Typography>
    </Container>
  );
};
