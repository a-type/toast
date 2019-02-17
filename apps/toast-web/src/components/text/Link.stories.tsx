import React from 'react';
import { storiesOf } from '@storybook/react';
import Link from './Link';

storiesOf('TextLink', module).add('types', () => (
  <Link to="#">Hello there</Link>
));
