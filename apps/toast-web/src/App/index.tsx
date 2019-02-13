import { hot } from 'react-hot-loader';
import * as React from 'react';
import Routes from './Routes';
import { Global as GlobalMessages } from 'features/messages';
import { Background } from 'components/generic';
import { show } from '../messages';
import { TokenContext } from 'features/auth';
import { ApolloProvider } from 'react-apollo';
import apolloClient from 'apolloClient';
import { Router } from 'react-router-dom';
import history from 'browserHistory';
import { GlobalStyle, grommetTheme } from 'theme';
import { Grommet } from 'grommet';

class App extends React.Component<any, any> {
  componentDidMount() {
    const SEEN_WELCOME_MESSAGE_KEY = 'toast_seen_welcome';

    const hasSeenWelcome =
      localStorage.getItem(SEEN_WELCOME_MESSAGE_KEY) === 'true';

    if (!hasSeenWelcome) {
      show([
        'Welcome to Toast!',
        "Toast is a meal planning site which understands the food you're cooking with.",
        "We're still setting up here, so things may break!",
      ]);
      localStorage.setItem(SEEN_WELCOME_MESSAGE_KEY, 'true');
    }
  }

  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <Grommet theme={grommetTheme}>
          <Router history={history}>
            <TokenContext.Provider>
              <Background.Manager>
                <Routes />
                <GlobalMessages />
              </Background.Manager>
            </TokenContext.Provider>
          </Router>
          <GlobalStyle />
        </Grommet>
      </ApolloProvider>
    );
  }
}

export default hot(module)(App);
