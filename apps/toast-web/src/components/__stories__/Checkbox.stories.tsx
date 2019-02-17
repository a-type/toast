import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, CheckBox } from 'grommet';

storiesOf('CheckBox', module).add('kinds', () => (
  <Box pad="large" align="start">
    <CheckBox label="Plain" />
    <CheckBox checked label="Checked" />
    <CheckBox disabled label="Disabled" />
  </Box>
));
