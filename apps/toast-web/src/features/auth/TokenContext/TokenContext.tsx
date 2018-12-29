import * as React from 'react';
import auth from 'services/auth';
import { AuthUser, AuthEventType } from 'services/auth/types';

interface AuthContext {
  user: AuthUser;
  isLoggedIn: boolean;
  hasScope(scope: string): boolean;
}

const ctx = React.createContext<AuthContext>(null);
const InternalProvider = ctx.Provider;

class TokenProvider extends React.Component {
  state = {
    user: auth.user,
    isLoggedIn: auth.isLoggedIn,
    hasScope: auth.hasScope,
  };

  componentDidMount() {
    auth.addListener(AuthEventType.TokenStored, this.onTokenChanged);
    auth.addListener(AuthEventType.TokenExpired, this.onTokenChanged);
  }

  componentWillUnmount() {
    auth.removeListener(AuthEventType.TokenStored, this.onTokenChanged);
    auth.removeListener(AuthEventType.TokenExpired, this.onTokenChanged);
  }

  onTokenChanged = () => {
    this.setState({
      user: auth.user,
      isLoggedIn: auth.isLoggedIn,
      hasScope: auth.hasScope,
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
export const Consumer = ctx.Consumer;

export default { Provider, Consumer };
