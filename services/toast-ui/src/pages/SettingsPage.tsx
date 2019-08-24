import React, { FC } from 'react';
import { GroceryDay } from 'components/features/groceryDay/GroceryDay';
import LogoutButton from 'components/features/LogoutButton';
import { Typography, Box, Container, Divider, Button } from '@material-ui/core';
import { GroupInviteButton } from 'components/features/GroupInviteButton';
import Link from 'components/generic/Link';

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
        <GroupInviteButton />
      </Box>
      <Divider />
      <Box mb={2} mt={2}>
        <Button component={Link} to="/subscription">
          Manage your subscription
        </Button>
      </Box>
      <Divider />
      <Box mb={2} mt={2}>
        <LogoutButton />
      </Box>
    </Container>
  );
};
