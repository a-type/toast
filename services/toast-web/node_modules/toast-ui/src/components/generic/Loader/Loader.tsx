import * as React from 'react';
import styled from 'styled-components';
import { useDebounce } from 'use-debounce';
import { InlineLoader } from './InlineLoader';

const GlobalContainer = styled<{ full?: boolean }, 'div'>('div')`
  position: fixed;
  bottom: ${props => (props.full ? 'auto' : '88px')};
  right: ${props => (props.full ? 'auto' : 'var(--spacing-lg)')};
  top: ${props => (props.full ? '50%' : 'auto')};
  left: ${props => (props.full ? '50%' : 'auto')};
  transform: ${props =>
    props.full ? 'translate(-50%, -50%)' : 'translate(0, 0)'};
  pointer-events: none;
  transition: 0.25s ease all;
`;

export type LoaderProps = {
  full?: boolean;
  size?: string;
};

export const Loader: React.FC<LoaderProps> = props => {
  const [debouncedFull] = useDebounce(props.full, 500);
  return (
    <GlobalContainer full={debouncedFull}>
      <InlineLoader size={props.size || (debouncedFull ? '30vw' : '12vw')} />
    </GlobalContainer>
  );
};
