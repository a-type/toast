import React from 'react';
import { Box, TitleBar, Background } from './components';
import Foreground from '../Foreground';

export default class Modal extends React.PureComponent {
  static TitleBar = TitleBar;

  stopPropagation = ev => {
    ev.stopPropagation();
    ev.nativeEvent.stopImmediatePropagation();
  };

  handleBackgroundClicked = ev => {
    this.stopPropagation(ev);
    this.props.onClose();
  };

  render() {
    const { visible, children } = this.props;

    if (!visible) {
      return null;
    }

    return (
      <Foreground>
        <Background
          onMouseUp={this.handleBackgroundClicked}
          onMouseDown={this.stopPropagation}
        >
          <Box
            onMouseDown={this.stopPropagation}
            onMouseUp={this.stopPropagation}
          >
            {children}
          </Box>
        </Background>
      </Foreground>
    );
  }
}
