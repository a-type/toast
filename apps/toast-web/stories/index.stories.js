import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import '../public/stylesheets/icons.css';
import '../public/stylesheets/food-icons.css';

import { BrowserRouter } from 'react-router-dom';

import theme from '../src/theme';

import Grid from './components/Grid';

import {
  Button,
  Input,
  Link,
  Pill,
  Divider,
  Checkbox,
  Form,
} from 'components/generic';

storiesOf('Button', module).add('demo', () => (
  <Grid>
    <Button onClick={action('clicked')}>Button</Button>
    <Button.Ghost onClick={action('clicked')}>Ghost</Button.Ghost>
    <Button.Positive onClick={action('clicked')}>Positive</Button.Positive>
    <Button.Negative onClick={action('clicked')}>Negative</Button.Negative>
  </Grid>
));

storiesOf('Input', module)
  .add('demo', () => (
    <Grid>
      <Input />
    </Grid>
  ))
  .add('H1', () => (
    <Grid>
      <Input.H1 />
    </Grid>
  ))
  .add('Block', () => (
    <Grid>
      <Input.Block />
    </Grid>
  ));

storiesOf('Link', module).add('demo', () => (
  <BrowserRouter>
    <Grid>
      <Link to="#">Link</Link>
      <Link.Positive to="#">Positive</Link.Positive>
      <Link.Negative to="#">Negative</Link.Negative>
      <Link.Clear to="#">Clear</Link.Clear>
    </Grid>
  </BrowserRouter>
));

storiesOf('Pill', module).add('demo', () => (
  <Grid>
    <Pill onClick={action('clicked')}>Interactive</Pill>
    <Pill.Border>Non-interactive</Pill.Border>
  </Grid>
));

storiesOf('Checkbox', module).add('demo', () => (
  <Grid>
    <Checkbox value="checkbox">Checkbox</Checkbox>
  </Grid>
));

storiesOf('Form', module).add('demo', () => (
  <div style={{ padding: '30px' }}>
    <Form>
      <Form.Field.Group>
        <Form.Field label="Label" alignContent="stretch">
          <Input />
        </Form.Field>
        <Form.Field label="Label">
          <Input />
        </Form.Field>
        <Form.Field columnSpan={2}>
          <Checkbox value="hello">Checkbox</Checkbox>
        </Form.Field>
        <Form.Field>
          <Button>Button</Button>
          <Button.Ghost>Button</Button.Ghost>
        </Form.Field>
      </Form.Field.Group>
    </Form>
  </div>
));
