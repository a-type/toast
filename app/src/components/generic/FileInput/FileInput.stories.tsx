import * as React from 'react';
import { storiesOf } from '@storybook/react';
import FileInput from './index';
// @ts-ignore
import demoImage from './demo.jpg';
import { Box } from '@material-ui/core';

storiesOf('FileInput', module).add('kinds', () => (
  <Box p={3} alignItems="start">
    <FileInput label="Empty" />
    <FileInput value={demoImage} label="Preview" />
    <FileInput disabled label="Disabled" />
  </Box>
));
