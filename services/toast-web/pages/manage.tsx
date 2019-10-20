import React, { FC } from 'react';
import { IsAdmin } from 'components/auth/IsAdmin';
import { Container, Typography } from '@material-ui/core';
import { ManageFoodList } from 'components/manage/ManageFoodList';

export type ManagePageProps = {};

const ManagePage: FC<ManagePageProps> = ({}) => {
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

export default ManagePage;
