import React from 'react';
import { createPortal } from 'react-dom';
import { PORTAL_ID } from './constants';
import context from './context';

class Background extends React.Component {
  componentDidMount() {
    this.props.register(this.props.backgroundKey);
  }

  componentWillUnmount() {
    this.props.unregister(this.props.backgroundKey);
  }

  render() {
    const { children } = this.props;
    return createPortal(children, document.getElementById(PORTAL_ID));
  }
}

export default props => (
  <context.Consumer>
    {({ register, unregister }) => (
      <Background {...props} register={register} unregister={unregister} />
    )}
  </context.Consumer>
);
