import React, { createContext } from 'react';
import auth from 'services/auth';

const ctx = createContext();
const InternalProvider = ctx.Provider;

class TokenProvider extends React.Component {
  state = {
    user: auth.user,
    isLoggedIn: auth.isLoggedIn,
    scopes: auth.scopes,
  };

  componentDidMount() {
    auth.addListener(auth.eventTypes.tokenStored, this.onTokenChanged);
    auth.addListener(auth.eventTypes.tokenExpired, this.onTokenChanged);
  }

  componentWillUnmount() {
    auth.removeListener(auth.eventTypes.tokenStored, this.onTokenChanged);
    auth.removeListener(auth.eventTypes.tokenExpired, this.onTokenChanged);
  }

  onTokenChanged = () => {
    this.setState({
      user: auth.user,
      isLoggedIn: auth.isLoggedIn,
      scopes: auth.scopes,
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
