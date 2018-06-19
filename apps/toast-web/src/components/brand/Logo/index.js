import React from 'react';
import Text from './Text';
import Wrapper from './Wrapper';
import Bubble from './Bubble';

export default class Logo extends React.PureComponent {
  state = {
    showBubbles: false,
  };

  onMouseEnter = () => this.setState({ showBubbles: true });
  onMouseLeave = () => this.setState({ showBubbles: false });

  render() {
    return (
      <Wrapper
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onTouchStart={this.onMouseEnter}
        onTouchEnd={this.onMouseLeave}
      >
        {new Array(5)
          .fill(null)
          .map((_, key) => <Bubble show={this.state.showBubbles} key={key} />)}
        <Text>Toast</Text>
      </Wrapper>
    );
  }
}
