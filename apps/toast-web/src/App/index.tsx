import * as React from 'react';
import Routes from './Routes';
import Layout from './Layout';
import { NavBar } from 'features/structure';
import { hot } from 'react-hot-loader';
import { Global as GlobalMessages } from 'features/messages';
import { Background } from 'components/generic';
import { show } from '../messages';
import { TokenContext } from 'features/auth';
import { ApolloProvider } from 'react-apollo';
import apolloClient from 'apolloClient';
import { Router } from 'react-router-dom';
import history from 'browserHistory';

class App extends React.Component<any, any> {
  componentDidMount() {
    const SEEN_WELCOME_MESSAGE_KEY = 'toast_seen_welcome';

    const hasSeenWelcome =
      localStorage.getItem(SEEN_WELCOME_MESSAGE_KEY) === 'true';

    if (!hasSeenWelcome) {
      show([
        'Welcome to Toast!',
        "Toast is a recipe discovery site which understands the food you're cooking with.",
        "We're still setting up here, so things may break!",
      ]);
      localStorage.setItem(SEEN_WELCOME_MESSAGE_KEY, 'true');
    }
  }

  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <Router history={history}>
          <TokenContext.Provider>
            <Background.Manager>
              <Layout>
                <Layout.Navigation>
                  <NavBar />
                </Layout.Navigation>
                <Layout.Content>
                  <Routes />
                </Layout.Content>
                <GlobalMessages />
              </Layout>
            </Background.Manager>
          </TokenContext.Provider>
        </Router>
      </ApolloProvider>
    );
  }
}

export default hot(module)(App);
