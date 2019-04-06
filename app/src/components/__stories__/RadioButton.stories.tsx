import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, RadioButton } from 'grommet';

storiesOf('RadioButton', module).add('kinds', () => (
  <Box pad="large" align="start">
    <RadioButton name="plain" value="foo" label="Undone" />
    <RadioButton name="placeholder" checked label="Done" />
    <RadioButton name="disabled" disabled label="Bah!" />
  </Box>
));
