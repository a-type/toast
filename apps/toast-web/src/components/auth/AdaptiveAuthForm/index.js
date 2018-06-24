import React from 'react';
import { Formik } from 'formik';
import { Form } from 'components/generic';
import { H1, Button, Input } from 'components/typeset';
import { sentence } from 'change-case';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import auth from 'apolloClient/auth';

const Login = gql`
  mutation Login($email: String!, $password: String!) {
    login(credential: { email: { email: $email, password: $password } }) {
      token
    }
  }
`;

const Signup = gql`
  mutation Signup(
    $name: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    signup(
      name: $name
      username: $username
      credential: { email: { email: $email, password: $password } }
    ) {
      token
    }
  }
`;

export default class AdaptiveAuthForm extends React.PureComponent {
  state = {
    mode: 'LOG_IN',
  };

  signup = () => this.setState({ mode: 'SIGN_UP' });
  login = () => this.setState({ mode: 'LOG_IN' });

  renderFields = (values, handleChange) => {
    const { mode } = this.state;
    switch (mode) {
      case 'LOG_IN':
        return (
          <React.Fragment>
            <Form.Field label="Your email">
              <Input
                value={values.email}
                onChange={handleChange}
                name="email"
                required
              />
            </Form.Field>
            <Form.Field label="Your password">
              <Input
                value={values.password}
                onChange={handleChange}
                name="password"
                type="password"
                required
              />
            </Form.Field>
          </React.Fragment>
        );
      case 'SIGN_UP':
        return (
          <React.Fragment>
            <Form.Field label="Your email">
              <Input
                value={values.email}
                onChange={handleChange}
                name="email"
                required
              />
            </Form.Field>
            <Form.Field label="Your password">
              <Input
                value={values.password}
                onChange={handleChange}
                name="password"
                type="password"
                required
              />
            </Form.Field>
            <Form.Field label="Your name">
              <Input
                value={values.name}
                onChange={handleChange}
                name="name"
                required
              />
            </Form.Field>
            <Form.Field label="A unique username">
              <Input
                value={values.username}
                onChange={handleChange}
                name="username"
                required
              />
            </Form.Field>
          </React.Fragment>
        );
    }
  };

  renderControls = () => {
    const { mode } = this.state;
    switch (mode) {
      case 'LOG_IN':
        return (
          <Form.Field columnSpan={2}>
            <div>
              <Button.Ghost onClick={this.signup}>Sign up instead</Button.Ghost>
              <Button type="submit">Log in</Button>
            </div>
          </Form.Field>
        );
      case 'SIGN_UP':
        return (
          <Form.Field columnSpan={2}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}
            >
              <Button.Ghost onClick={this.login}>Log in instead</Button.Ghost>
              <Button type="submit">Sign up</Button>
            </div>
          </Form.Field>
        );
    }
  };

  renderForm = handleSubmit => (
    <Formik onSubmit={handleSubmit}>
      {({ values, handleChange, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <H1>{sentence(this.state.mode)}</H1>
          <Form.Field.Group>
            {this.renderFields(values, handleChange)}
            {this.renderControls()}
          </Form.Field.Group>
        </Form>
      )}
    </Formik>
  );

  render() {
    const { mode } = this.state;
    switch (mode) {
      case 'LOG_IN':
        return (
          <Mutation mutation={Login}>
            {runMutation =>
              this.renderForm(data =>
                runMutation({
                  variables: data,
                }).then(({ data: { login: { token } } }) => {
                  auth.authToken = token;
                }),
              )
            }
          </Mutation>
        );
      case 'SIGN_UP':
        return (
          <Mutation mutation={Login}>
            {runMutation =>
              this.renderForm(data =>
                runMutation({
                  variables: data,
                }).then(({ data: { signup: { token } } }) => {
                  auth.authToken = token;
                }),
              )
            }
          </Mutation>
        );
      default:
        return null;
    }
  }
}
