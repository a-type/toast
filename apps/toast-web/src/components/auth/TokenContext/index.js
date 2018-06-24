import React, { createContext } from 'react';
import auth from 'apolloClient/auth';

const ctx = createContext(auth.parsedToken);
const InternalProvider = ctx.Provider;

class TokenProvider extends React.PureComponent {
  state = auth.parsedToken;

  componentDidMount() {
    auth.addListener(auth.eventTypes.tokenStored, this.onTokenStored);
  }

  componentWillUnmount() {
    auth.removeListener(auth.eventTypes.tokenStored, this.onTokenStored);
  }

  onTokenStored = ({ parsedToken }) => {
    this.setState(parsedToken);
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
