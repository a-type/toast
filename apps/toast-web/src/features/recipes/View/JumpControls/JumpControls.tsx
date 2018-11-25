import React from 'react';
import Container from './Container';
import Button from './Button';
import { scroller as scroll } from 'react-scroll';

export default class JumpControls extends React.PureComponent {
  jumpToIngredients = () => {
    scroll.scrollTo('Title', {
      duration: 200,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  jumpToSteps = () => {
    scroll.scrollTo('StepsSection', {
      duration: 200,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  render() {
    return (
      <React.Fragment>
        <Container>
          <Button onClick={this.jumpToIngredients}>Ingredients</Button>
          <Button onClick={this.jumpToSteps}>Steps</Button>
        </Container>
        <div style={{ height: '64px' }} className="spacer" />
      </React.Fragment>
    );
  }
}
