import * as React from 'react';
import { storiesOf } from '@storybook/react'
import Input from './index';
import { Box } from 'grommet';

storiesOf('Input', module).add('kinds', () => (
  <Box pad="large" align="start">
    <Input name="plain" value="foo" />
    <Input name="placeholder" placeholder="placeholder" />
    <Input name="small" size={"small" as any} />
    <Input name="large" size={"large" as any} />
  </Box>
));
