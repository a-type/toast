import React from 'react';
import Input from 'components/generic/Input';
import Form from 'components/generic/Form';
import Button from 'components/generic/Button';

export default ({
  email,
  password,
  onEmailChanged,
  onPasswordChanged,
  login,
}) => (
  <Form
    onSubmit={e => {
      e.preventDefault();
      login(email, password);
    }}
  >
    <Form.Field.Group columns={1}>
      <Form.Field label="Your email">
        <Input value={email} onChange={e => onEmailChanged(e.target.value)} />
      </Form.Field>
      <Form.Field label="Your password">
        <Input
          value={password}
          onChange={e => onPasswordChanged(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <Button type="submit">Log in</Button>
      </Form.Field>
    </Form.Field.Group>
  </Form>
);
