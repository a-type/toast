import * as React from 'react';
import { storiesOf } from '@storybook/react'
import Checkbox from './index';
import { Box } from 'grommet';

storiesOf('Checkbox', module).add('kinds', () => (
  <Box pad="large" align="start">
    <Checkbox label="Plain" />
    <Checkbox checked label="Checked" />
    <Checkbox disabled label="Disabled" />
  </Box>
));
