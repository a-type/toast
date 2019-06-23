import * as React from 'react';
import firebase from 'services/firebase';
import client from 'apolloClient';
import gql from 'graphql-tag';
import AuthContext from 'contexts/AuthContext';

export interface AuthContext {
  user: firebase.User;
  token: firebase.auth.IdTokenResult;
  isLoggedIn: boolean;
}

const MergeUser = gql`
  mutation MergeUser {
    mergeUser {
      id
    }
  }
`;

const InternalProvider = AuthContext.Provider;

class TokenProvider extends React.Component {
  state = {
    user: null,
    token: null,
    isLoggedIn: undefined,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(this.onTokenChanged);
  }

  onTokenChanged = async (user: firebase.User) => {
    const token = user ? await user.getIdTokenResult() : null;

    if (token) {
      try {
        await client.mutate({
          mutation: MergeUser,
        });
      } catch (err) {
        console.error(err);
        // continue on...
      }
    }

    this.setState({
      user: user || null,
      token,
      isLoggedIn: !!user,
    });
  };

  render() {
    return (
      <InternalProvider value={this.state}>
        {this.props.children}
      </InternalProvider>
    );
  }
}

export const Provider = TokenProvider;
export const Consumer = AuthContext.Consumer;

export default { Provider, Consumer };
