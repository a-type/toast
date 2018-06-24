// @flow

import React from 'react';
import Wrapper from './Wrapper';
import Bubble from './Bubble';

export type Props = {
  animated: boolean,
  backgroundColor: string,
  bubbleColors: string[],
  children: mixed,
  bubbleCount: number,
  style: {},
};

type State = {
  showBubbles: boolean,
};

export default class Bubbles extends React.PureComponent<Props, State> {
  static defaultProps = {
    backgroundColor: 'brand',
    bubbleColors: ['positive', 'negative', 'brand'],
    bubbleCount: 5,
  };

  state = {
    showBubbles: !this.props.animated,
  };

  onMouseEnter = () => {
    if (!this.props.animated) {
      return;
    }
    this.setState({ showBubbles: true });
  };

  onMouseLeave = () => {
    if (!this.props.animated) {
      return;
    }
    this.setState({ showBubbles: false });
  };

  render() {
    const {
      backgroundColor,
      bubbleColors,
      children,
      bubbleCount,
      style,
    } = this.props;

    return (
      <Wrapper
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onTouchStart={this.onMouseEnter}
        onTouchEnd={this.onMouseLeave}
        backgroundColor={backgroundColor}
        style={style}
      >
        {new Array(bubbleCount)
          .fill(null)
          .map((_, key) => (
            <Bubble
              colorOptions={bubbleColors}
              show={this.state.showBubbles}
              key={key}
            />
          ))}
        {children}
      </Wrapper>
    );
  }
}
