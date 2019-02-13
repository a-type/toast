import * as React from 'react';
import { storiesOf } from '@storybook/react'
import Select from './index';
import { Box } from 'grommet';

storiesOf('Select', module).add('kinds', () => (
  <Box pad="large" align="start">
    <Select value="One" options={['One', 'Two', 'Three']} />
    <Select value="One" options={['One', 'Two', 'Three']} disabled />
  </Box>
));
