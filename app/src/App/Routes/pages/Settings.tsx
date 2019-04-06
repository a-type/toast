import React, { FC } from 'react';
import Column from 'components/layout/Column';
import { GroceryDay } from 'features/plan';
import Invite from 'features/groups/Invite';
import { Heading, Box } from 'grommet';

export interface SettingsPageProps {}

export const SettingsPage: FC<SettingsPageProps> = ({}) => {
  return (
    <Column>
      <Heading level="2">Group Settings</Heading>
      <Box margin={{ bottom: 'large' }}>
        <GroceryDay />
      </Box>
      <Box margin={{ bottom: 'large' }}>
        <Invite />
      </Box>
    </Column>
  );
};

export default SettingsPage;
