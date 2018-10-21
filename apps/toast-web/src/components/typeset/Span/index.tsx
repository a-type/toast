import styled, { StyledComponentClass } from 'styled-components';
import { getSize, Size } from 'theme';
import Skeleton from './Skeleton';

export type SpanProps = {
  textSize?: Size;
  spaceBelow?: Size | string;
};

interface SpanWithSkeleton extends StyledComponentClass<SpanProps, {}> {
  Skeleton?: typeof Skeleton;
}

const Span = styled<SpanProps, 'span'>('span')`
  font-size: var(${props => `--font-size-${props.textSize || 'md'}`});
  display: inline-block;
  margin-top: -0.16em;
  margin-bottom: calc(${props => getSize(props.spaceBelow)} - 0.36em);
` as SpanWithSkeleton;

Span.Skeleton = Skeleton;

export default Span;
