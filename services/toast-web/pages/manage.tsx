import React from 'react';
import { IsAdmin } from 'components/auth/IsAdmin';
import { Container, Typography } from '@material-ui/core';
import { ManageFoodList } from 'components/manage/ManageFoodList';
import { NextPage } from 'next';
import { ensureLoggedIn } from 'lib/auth';

export type ManagePageProps = {};

const ManagePage: NextPage<ManagePageProps> = ({}) => {
  return (
    <IsAdmin fallback={<div>Not found</div>}>
      <Container maxWidth="lg">
        <Typography variant="h1" gutterBottom>
          Manage
        </Typography>
        <Typography variant="h2" gutterBottom>
          Foods
        </Typography>
        <ManageFoodList />
      </Container>
    </IsAdmin>
  );
};

ManagePage.getInitialProps = async ctx => {
  await ensureLoggedIn(ctx);
  return {};
};

export default ManagePage;
