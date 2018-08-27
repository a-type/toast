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
  SelectionEditor,
} from 'components/generic';
import { P, H1, H2 } from 'components/typeset';
import { Logo } from 'components/brand';

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
      <Input.H1 value="Header style!" />
      <div style={{ height: '24px' }} />
      <Checkbox value="foo">A checkbox!</Checkbox>
      <div style={{ height: '24px' }} />
      <Input.Block value="Block style!" />
    </div>
  ));

class SelectionState extends React.Component {
  state = {
    selections: [
      { name: 'value', text: '1/2', color: 'positive' },
      { name: 'unit', text: 'cup', color: 'negative' },
      { name: 'ingredient', text: 'flour' },
    ],
    value: '1/2 cup of enriched flour',
  };

  onSelectionChanged = (name, text) => {
    this.setState(({ selections }) => {
      selections.find(s => s.name === name).text = text;
      return {
        selections,
      };
    });
  };

  render() {
    const { value, selections } = this.state;
    return (
      <SelectionEditor
        value={value}
        selections={selections}
        onSelectionChanged={this.onSelectionChanged}
      />
    );
  }
}

storiesOf('SelectionEditor', module).add('basic', () => <SelectionState />);
