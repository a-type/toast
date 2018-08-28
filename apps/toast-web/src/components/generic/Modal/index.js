import React from 'react';
import { createPortal } from 'react-dom';
import { Box, TitleBar, Background, Layer } from './components';

export default class Modal extends React.PureComponent {
  static TitleBar = TitleBar;
  static Layer = Layer;

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

    const el = document.getElementById('modalLayer');
    if (!el) {
      return null;
    }

    return createPortal(
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
      </Background>,
      el,
    );
  }
}
