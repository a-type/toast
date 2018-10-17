import React from 'react';
import { createPortal } from 'react-dom';
import { PORTAL_ID } from './constants';
import context from './context';
import styled from 'styled-components';

const ColorBlock = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => props.color};
`;

class Background extends React.Component {
  componentDidMount() {
    this.props.register(this.props.backgroundKey);
  }

  componentWillUnmount() {
    this.props.unregister(this.props.backgroundKey);
  }

  render() {
    const { children, color } = this.props;

    return createPortal(
      color ? <ColorBlock color={color} /> : children,
      document.getElementById(PORTAL_ID),
    );
  }
}

export default props => (
  <context.Consumer>
    {({ register, unregister }) => (
      <Background {...props} register={register} unregister={unregister} />
    )}
  </context.Consumer>
);
