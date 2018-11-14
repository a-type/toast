import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import '../public/stylesheets/icons.css';
import '../public/stylesheets/food-icons.css';

import { BrowserRouter } from 'react-router-dom';

import Grid from './components/Grid';

import { Button, Input, Checkbox, Form } from '../src/components/generic';
import { P, H1, H2, Link } from '../src/components/typeset';
import { Logo, BackdropArt } from '../src/components/brand';

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

storiesOf('Logo', module).add('demo', () => (
  <div style={{ padding: '30px', display: 'flex' }}>
    <Logo />
  </div>
));

storiesOf('Vertical rhythm', module)
  .add('text', () => (
    <BrowserRouter>
      <div
        style={{
          background:
            'linear-gradient(#b3075332, #b3075332 1px, transparent 1px)',
          backgroundSize: '1px 24px',
          paddingBottom: '24px',
          overflow: 'hidden',
        }}
      >
        <P>Paragraph, one line</P>
        <H1>Heading 1</H1>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          gravida eget massa a tincidunt. Morbi interdum elit at sapien
          vestibulum sodales.
        </P>
        <H2>Heading 2</H2>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          gravida eget massa a tincidunt. Morbi interdum elit at sapien
          vestibulum sodales. <Link>Link to somewhere</Link> ipsum dolor sit
          amet, consectetur adipiscing elit. Quisque gravida
        </P>
        <P textSize="sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          gravida eget massa a tincidunt. Morbi interdum elit at sapien
          vestibulum sodales. <Link>Link to somewhere</Link> ipsum dolor sit
          amet, consectetur adipiscing elit. Quisque gravida
        </P>
        <br />
        <Button>Test button</Button>
        <H1>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          gravida eget massa a tincidunt. Morbi interdum elit at sapien
          vestibulum sodales.
        </H1>
        <H2>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          gravida eget massa a tincidunt. Morbi interdum elit at sapien
          vestibulum sodales.
        </H2>
      </div>
    </BrowserRouter>
  ))
  .add('inputs', () => (
    <div
      style={{
        background:
          'linear-gradient(#b3075332, #b3075332 1px, transparent 1px)',
        backgroundSize: '1px 24px',
        paddingBottom: '24px',
        overflow: 'hidden',
        paddingLeft: '8px',
        paddingRight: '8px',
      }}
    >
      <Input value="Foo Bar Baz" />
      <div style={{ height: '24px' }} />
      <Input.Block value="Block style!" />
    </div>
  ));

storiesOf('BackdropArt', module).add('basic', () => (
  <div style={{ width: '100vw', height: '100vh' }}>
    <BackdropArt />
  </div>
));
