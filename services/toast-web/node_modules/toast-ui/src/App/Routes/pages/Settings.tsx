import React, { FC } from 'react';
import { GroceryDay } from 'features/plan';
import Invite from 'features/groups/Invite';
import LogoutButton from 'features/structure/LogoutButton';
import { Typography, Box, Container, Divider } from '@material-ui/core';

export interface SettingsPageProps {}

export const SettingsPage: FC<SettingsPageProps> = ({}) => {
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Group Settings
      </Typography>
      <Box mb={2} mt={2}>
        <GroceryDay />
      </Box>
      <Divider />
      <Box mb={2} mt={2}>
        <Invite />
      </Box>
      <Divider />
      <Box mb={2} mt={2}>
        <LogoutButton />
      </Box>
    </Container>
  );
};

export default SettingsPage;
