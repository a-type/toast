import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, TextInput } from 'grommet';

storiesOf('Input', module).add('kinds', () => (
  <Box pad="large" align="start">
    <TextInput name="plain" value="foo" />
    <TextInput name="placeholder" placeholder="placeholder" />
    <TextInput name="small" size={'small' as any} />
    <TextInput name="large" size={'large' as any} />
    <TextInput disabled placeholder="disabled" />
  </Box>
));
