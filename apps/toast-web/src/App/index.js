import React from 'react';
import Routes from './Routes';
import Layout from './Layout';
import { NavBar } from 'features/structure';
import { hot } from 'react-hot-loader';
import { Modal } from 'components/generic';
import { Global as GlobalMessages } from 'features/messages';
import { show } from '../messages';

class App extends React.Component {
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
      <Layout>
        <NavBar />
        <Routes />
        <Modal.Layer />
        <GlobalMessages />
      </Layout>
    );
  }
}

export default hot(module)(App);
