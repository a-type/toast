import * as React from 'react';
import { storiesOf } from '@storybook/react';
import FileInput from './index';
import { Box } from 'grommet';
import { Icon } from 'components/generic';
// @ts-ignore
import demoImage from './demo.jpg';

storiesOf('FileInput', module).add('kinds', () => (
  <Box pad="large" align="start">
    <FileInput label="Empty" />
    <FileInput value={demoImage} label="Preview" />
    <FileInput disabled label="Disabled" />
  </Box>
));
