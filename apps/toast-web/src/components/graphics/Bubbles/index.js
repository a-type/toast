import React, { createRef } from 'react';
import Wrapper from './Wrapper';
import Bubble from './Bubble';

export default class Bubbles extends React.PureComponent {
  static defaultProps = {
    backgroundColor: 'brand',
    bubbleColors: ['positive', 'negative', 'brand'],
    bubbleCount: 5,
  };

  state = {
    showBubbles: !this.props.animated,
    bubbleSize: 0,
  };

  wrapperRef = createRef();

  componentDidMount() {
    this.updateSize();
  }

  componentDidUpdate() {
    this.updateSize();
  }

  updateSize = () => {
    if (this.wrapperRef.current) {
      this.setState({
        bubbleSize: this.wrapperRef.current.clientWidth / 3,
      });
    }
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
      animated,
      ...rest
    } = this.props;
    const { bubbleSize } = this.state;

    return (
      <Wrapper
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onTouchStart={this.onMouseEnter}
        onTouchEnd={this.onMouseLeave}
        backgroundColor={backgroundColor}
        style={style}
        ref={this.wrapperRef}
        {...rest}
      >
        {new Array(bubbleCount).fill(null).map((_, key) => (
          <Bubble
            colorOptions={bubbleColors}
            show={this.state.showBubbles}
            key={key}
            size={bubbleSize}
            animated={animated}
          />
        ))}
        {children}
      </Wrapper>
    );
  }
}
