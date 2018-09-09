import React from 'react';
import { Bubble, DismissButton } from './components';
import { P } from 'components/typeset';
import { DISMISS_ANIMATION_MS } from './constants';

const processContent = content => {
  if (content instanceof Array) {
    return content.map(line => <P key={line}>{line}</P>);
  }
  return <P>{content}</P>;
};

const DRAG_THRESHOLD = 100;

export default class extends React.Component {
  state = {
    dismissing: false,
    dragStart: null,
    dragDistance: 0,
  };

  constructor(props) {
    super(props);
  }

  handleDismiss = () => {
    this.setState({ dismissing: true });
    setTimeout(this.props.onDismiss, DISMISS_ANIMATION_MS);
  };

  handleTouchStart = ev => {
    const start = ev.changedTouches.item(0).screenX;
    this.setState({ dragStart: start });
  };

  handleTouchMove = ev => {
    const { dragStart } = this.state;
    if (!dragStart) {
      return;
    }

    const pos = ev.changedTouches.item(0).screenX;

    this.setState({ dragDistance: pos - dragStart });
  };

  handleTouchEnd = () => {
    const { dragDistance } = this.state;
    if (dragDistance > DRAG_THRESHOLD) {
      this.handleDismiss();
    } else {
      this.setState({ dragDistance: 0, dragStart: null });
    }
  };

  render() {
    const { children, onDismiss, ...rest } = this.props;
    const { dismissing, dragDistance } = this.state;

    return (
      <Bubble
        className={dismissing ? 'dismissing' : ''}
        style={{ left: `${dragDistance}px` }}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >
        {processContent(children)}
        {onDismiss && <DismissButton onClick={this.handleDismiss} />}
      </Bubble>
    );
  }
}
