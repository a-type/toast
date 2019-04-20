import * as React from 'react';
import Loader from './Loader';
import styled from 'styled-components';

const GlobalContainer = styled<{ full?: boolean }, 'div'>('div')`
  position: fixed;
  bottom: ${props => (props.full ? 'auto' : 'var(--spacing-lg)')};
  right: ${props => (props.full ? 'auto' : 'var(--spacing-lg)')};
  top: ${props => (props.full ? '50%' : 'auto')};
  left: ${props => (props.full ? '50%' : 'auto')};
  transform: ${props =>
    props.full ? 'translate(-50%, -50%)' : 'translate(0, 0)'};
  pointer-events: none;
  transition: 0.25s ease all;
  transition-delay: 0.1s;
`;

export type GlobalLoaderProps = {
  full?: boolean;
};

export const GlobalLoader: React.FC<GlobalLoaderProps> = props => (
  <GlobalContainer {...props}>
    <Loader size={props.full ? '20vw' : '7vw'} />
  </GlobalContainer>
);
