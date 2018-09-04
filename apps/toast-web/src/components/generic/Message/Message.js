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

export default class extends React.Component {
  state = {
    dismissing: false,
  };

  constructor(props) {
    super(props);
  }

  handleDismiss = () => {
    this.setState({ dismissing: true });
    setTimeout(this.props.onDismiss, DISMISS_ANIMATION_MS);
  };

  render() {
    const { children, onDismiss, ...rest } = this.props;
    const { dismissing } = this.state;

    return (
      <Bubble className={dismissing ? 'dismissing' : ''}>
        {processContent(children)}
        {onDismiss && <DismissButton onClick={this.handleDismiss} />}
      </Bubble>
    );
  }
}
