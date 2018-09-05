import React from 'react';
import Tip from './Tip';

export default class TipToggle extends React.PureComponent {
  state = {
    show: false,
  };

  show = () => this.setState({ show: true });
  hide = () => this.setState({ show: false });

  render() {
    const { children, ...rest } = this.props;

    return (
      <Tip
        disabled={!this.state.show}
        onBlur={this.hide}
        {...rest}
      >
        {({ ref }) => children({ ref, onClick: this.show })}
      </Tip>
    );
  }
}
