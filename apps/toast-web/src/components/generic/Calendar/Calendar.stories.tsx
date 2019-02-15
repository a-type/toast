import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Calendar from './Calendar';

storiesOf('Calendar', module).add('basic', () => (
  <Calendar value={new Date()} />
));
