import * as React from 'react';
import Loader from './Loader';
import styled from 'styled-components';
import { useDebounce } from 'use-debounce';

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
`;

export type GlobalLoaderProps = {
  full?: boolean;
};

export const GlobalLoader: React.FC<GlobalLoaderProps> = props => {
  const [debouncedFull] = useDebounce(props.full, 500);
  return (
    <GlobalContainer full={debouncedFull}>
      <Loader size={debouncedFull ? '20vw' : '7vw'} />
    </GlobalContainer>
  );
};
