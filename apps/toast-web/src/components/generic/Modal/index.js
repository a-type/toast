import React from 'react';
import { Box, TitleBar, Background } from './components';

export default class Modal extends React.PureComponent {
  static TitleBar = TitleBar;

  handleBoxClicked = ev => {
    ev.preventDefault();
    ev.stopPropagation();
  };

  handleBackgroundClicked = () => {
    this.props.onClose();
  };

  render() {
    const { visible, children } = this.props;

    if (!visible) {
      return null;
    }

    return (
      <Background onClick={this.handleBackgroundClicked}>
        <Box onClick={this.handleBoxClicked}>{children}</Box>
      </Background>
    );
  }
}
