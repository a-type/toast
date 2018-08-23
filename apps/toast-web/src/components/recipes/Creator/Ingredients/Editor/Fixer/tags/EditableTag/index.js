// @flow

import React from 'react';
import { Bubble } from './components';
import { Button, Tip } from 'components/generic';

type Props = {
  color: string,
  children: Node,
  onChangeSelection(): mixed,
  onChangeValue(): mixed,
};

type State = {
  tipVisible: boolean,
};

export default class EditableTag extends React.PureComponent<Props, State> {
  state = {
    tipVisible: false,
  };

  showTip = () => this.setState({ tipVisible: true });
  hideTip = () => this.setState({ tipVisible: false });

  renderControls = () => {
    return (
      <React.Fragment>
        <Button.Ghost onClick={this.props.onChangeSelection}>
          Change selection
        </Button.Ghost>
        <Button.Ghost onclick={this.props.onChangeValue}>
          Change value
        </Button.Ghost>
      </React.Fragment>
    );
  };

  render() {
    const { color, children } = this.props;
    const { tipVisible } = this.state;

    return (
      <React.Fragment>
        <Tip
          disabled={!tipVisible}
          tipContent={this.renderControls()}
          onBlur={this.hideTip}
        >
          {({ ref }) => (
            <Bubble color={color} innerRef={ref} onClick={this.showTip}>
              <span>{children}&nbsp;</span>
            </Bubble>
          )}
        </Tip>
      </React.Fragment>
    );
  }
}
