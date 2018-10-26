import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import { Background } from './components';
import { Foreground } from 'components/generic';
import { DURATION } from './constants';
import OutsideClickHandler from 'react-outside-click-handler';

interface PopupRenderProps {
  handleClose(): void;
}

type PopupRenderPropFn = (props: PopupRenderProps) => React.ReactNode;

interface PopupProps {
  children: React.ReactNode | PopupRenderPropFn;
  onClose(): void;
}

interface PopupState {
  closing: boolean;
}

export default class Popup extends React.PureComponent<PopupProps, PopupState> {
  state = {
    closing: false,
  };

  closeTimeout: number | null = null;

  handleClose = () => {
    this.setState({ closing: true });
    this.closeTimeout = window.setTimeout(this.doneClosing, DURATION);
  };

  doneClosing = () => {
    this.setState({ closing: false });
    this.props.onClose();
  };

  componentWillUnmount() {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
    }
  }

  renderContent = () => {
    const { children } = this.props;

    if (typeof children === 'function') {
      return (children as PopupRenderPropFn)({ handleClose: this.handleClose });
    }

    return children;
  };

  render() {
    const { closing } = this.state;

    return (
      <Foreground>
        <OutsideClickHandler
          onOutsideClick={this.handleClose}
          useCapture={false}
          display="block"
        >
          <CSSTransition
            appear
            classNames="appear"
            timeout={{ enter: DURATION, exit: DURATION }}
            in={!closing}
            unmountOnExit
          >
            <Background key="popup">{this.renderContent()}</Background>
          </CSSTransition>
        </OutsideClickHandler>
      </Foreground>
    );
  }
}
