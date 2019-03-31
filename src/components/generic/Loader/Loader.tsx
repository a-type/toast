import React from 'react';
import Rotator from './Rotator';
import { FoodIconName, FoodIcon } from 'components/generic/Icon';

const icons: FoodIconName[] = [
  'avocado',
  'beet',
  'bread',
  'carrot',
  'cheese',
  'cheeseburger',
  'cherry',
  'chinese-fried-rice',
  'croissant',
  'eggs',
  'fish-food',
  'food',
  'food-and-wine',
  'food-basket',
  'food-wrapper',
  'garlic',
  'ham',
  'italian-pizza',
  'leaf-outline',
  'olive',
  'olive-oil',
  'pancake',
  'peanuts',
  'pear',
  'pie',
  'piece-of-lemon-cake',
  'potato',
  'prawn',
  'sandwich',
  'sandwich-with-fried-egg',
  'slice-of-bread-outline',
  'soup-plate',
  'soy',
  'steak',
  'sushi',
  'taco',
  'tapas',
  'tomato',
  'vegan-food',
  'watermelon',
];

export default class Loader extends React.Component<
  { size?: string; color?: string },
  { icon: FoodIconName }
> {
  state: { icon: FoodIconName } = {
    icon: 'food-and-wine',
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
        <FoodIcon
          style={{ fontSize: this.props.size, color, opacity: 0.3 }}
          name={this.state.icon}
        />
      </Rotator>
    );
  }
}
