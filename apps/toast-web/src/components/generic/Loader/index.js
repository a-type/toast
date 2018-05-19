// @flow
import React from 'react';
import Rotator from './Rotator';
import Linear from './Linear';

const icons = [
  'icons8-apple',
  'icons8-avocado',
  'icons8-beet',
  'icons8-bread',
  'icons8-bread-toaster',
  'icons8-cheese',
  'icons8-fish-food',
  'icons8-food',
  'icons8-food-and-wine',
  'icons8-garlic',
  'icons8-hamburger',
  'icons8-ingredients',
  'icons8-kebab',
  'icons8-noodle-with-chopstick',
  'icons8-olive',
  'icons8-olive-oil',
  'icons8-paprika',
  'icons8-pear',
  'icons8-sandwich',
  'icons8-slice-of-pizza',
  'icons8-taco',
  'icons8-vegetarian-food',
];

type Props = {
  size: number,
};

type State = {
  icon: string,
};

export default class Loader extends React.Component<Props, State> {
  static Linear = Linear;

  state = {
    icon: 'icons8-food-and-wine',
  };

  timer: ?TimeoutID = null;

  componentDidMount() {
    this.timer = setTimeout(this.next, 700);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  next = () => {
    this.setState({ icon: icons[Math.floor(Math.random() * icons.length)] });
    this.timer = setTimeout(this.next, 1000);
  };

  render() {
    return (
      <Rotator>
        <span
          style={{ fontSize: this.props.size, color: 'black', opacity: 0.3 }}
          className={this.state.icon}
        />
      </Rotator>
    );
  }
}
