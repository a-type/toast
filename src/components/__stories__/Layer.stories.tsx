import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Layer, Box } from 'grommet';

storiesOf('Layer', module)
  .add('modal', () => (
    <Layer position="center">
      <Box pad="large">Some content</Box>
    </Layer>
  ))
  .add('sidebar', () => (
    <Layer position="left" full="vertical">
      <Box pad="large">Some content</Box>
    </Layer>
  ))
  .add('popup', () => (
    <Layer position="bottom" full="horizontal">
      <Box pad="large">Some content</Box>
    </Layer>
  ));
