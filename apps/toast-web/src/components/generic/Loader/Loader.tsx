import React from 'react';
import Rotator from './Rotator';

const icons = [
  'icons8-avocado',
  'icons8-beet',
  'icons8-bread',
  'icons8-carrot',
  'icons8-cheese',
  'icons8-cheeseburger',
  'icons8-cherry',
  'icons8-chinese-fried-rice',
  'icons8-croissant',
  'icons8-eggs',
  'icons8-fish-food',
  'icons8-food',
  'icons8-food-and-wine',
  'icons8-food-basket',
  'icons8-food-wrapper',
  'icons8-garlic',
  'icons8-ham',
  'icons8-italian-pizza',
  'icons8-leaf-outline',
  'icons8-olive',
  'icons8-olive-oil',
  'icons8-pancake',
  'icons8-peanuts',
  'icons8-pear',
  'icons8-pie',
  'icons8-piece-of-lemon-cake',
  'icons8-potato',
  'icons8-prawn',
  'icons8-sandwich',
  'icons8-sandwich-with-fried-egg',
  'icons8-slice-of-bread-outline',
  'icons8-soup-plate',
  'icons8-soy',
  'icons8-steak',
  'icons8-sushi',
  'icons8-taco',
  'icons8-tapas',
  'icons8-tomato',
  'icons8-vegan-food',
  'icons8-watermelon',
];

export default class Loader extends React.Component<
  { size?: string; color?: string },
  { icon: string }
> {
  state = {
    icon: 'icons8-food-and-wine',
  };

  timer = null;

  componentDidMount() {
    this.next();
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
    const { color = 'black' } = this.props;

    return (
      <Rotator>
        <span
          style={{ fontSize: this.props.size, color, opacity: 0.3 }}
          className={this.state.icon}
        />
      </Rotator>
    );
  }
}
