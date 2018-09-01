import React from 'react';
import { Formik } from 'formik';
import { Form, Field } from 'components/generic';
import { H1 } from 'components/typeset';
import { Input, Button } from 'components/generic';
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

const initialValues = {
  login: { email: '', password: '' },
  signup: { email: '', password: '', username: '', name: '' },
};

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
            <Field label="Your email">
              <Input
                value={values.email}
                onChange={handleChange}
                name="email"
                required
              />
            </Field>
            <Field label="Your password">
              <Input
                value={values.password}
                onChange={handleChange}
                name="password"
                type="password"
                required
              />
            </Field>
          </React.Fragment>
        );
      case 'SIGN_UP':
        return (
          <React.Fragment>
            <Field label="Your email">
              <Input
                value={values.email}
                onChange={handleChange}
                name="email"
                required
              />
            </Field>
            <Field label="Your password">
              <Input
                value={values.password}
                onChange={handleChange}
                name="password"
                type="password"
                required
              />
            </Field>
            <Field label="Your name">
              <Input
                value={values.name}
                onChange={handleChange}
                name="name"
                required
              />
            </Field>
            <Field label="A unique username">
              <Input
                value={values.username}
                onChange={handleChange}
                name="username"
                required
              />
            </Field>
          </React.Fragment>
        );
    }
  };

  renderControls = () => {
    const { mode } = this.state;
    switch (mode) {
      case 'LOG_IN':
        return (
          <Field columnSpan={2}>
            <div>
              <Button type="submit">Log in</Button>
              <Button.Ghost onClick={this.signup}>Sign up instead</Button.Ghost>
            </div>
          </Field>
        );
      case 'SIGN_UP':
        return (
          <Field columnSpan={2}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}
            >
              <Button type="submit">Sign up</Button>
              <Button.Ghost type="button" onClick={this.login}>
                Log in instead
              </Button.Ghost>
            </div>
          </Field>
        );
    }
  };

  renderForm = handleSubmit => (
    <Formik onSubmit={handleSubmit}>
      {({ values, handleChange, handleSubmit }) => (
        <Form
          onSubmit={handleSubmit}
          initialValues={initialValues[this.state.mode]}
          enableReinitialize
        >
          <H1>{sentence(this.state.mode)}</H1>
          {this.renderFields(values, handleChange)}
          {this.renderControls()}
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
                  this.props.onLogin();
                }),
              )
            }
          </Mutation>
        );
      case 'SIGN_UP':
        return (
          <Mutation mutation={Signup}>
            {runMutation =>
              this.renderForm(data =>
                runMutation({
                  variables: data,
                }).then(({ data: { signup: { token } } }) => {
                  auth.authToken = token;
                  this.props.onLogin();
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
