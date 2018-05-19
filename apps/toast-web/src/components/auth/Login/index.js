import React from 'react';
import StateProvider from './StateProvider';
import Form from './Form';
import { Mutation } from 'react-apollo';
import Login from 'mutations/Login';
import { storeAuthToken } from 'apolloClient/auth';

const renderForm = ({
  email,
  password,
  onEmailChanged,
  onPasswordChanged,
  login,
}) => (
  <Form
    email={email}
    password={password}
    onEmailChanged={onEmailChanged}
    onPasswordChanged={onPasswordChanged}
    login={login}
  />
);

const renderStatefulForm = runMutation => (
  <StateProvider>
    {args =>
      renderForm({
        ...args,
        login: () =>
          runMutation({
            variables: { email: args.email, password: args.password },
          }).then(({ data: { login: { token } } }) => {
            storeAuthToken(token);
          }),
      })
    }
  </StateProvider>
);

export default () => <Mutation mutation={Login}>{renderStatefulForm}</Mutation>;
