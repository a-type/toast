import * as React from 'react';
import styled from 'styled-components';

export type SpanSkeletonProps = {
  size?: number;
};

const Blob = styled<{ charCount: number }, 'span'>('span')`
  display: inline-block;
  background: var(--color-gray-lightest);
  height: 1em;
  width: ${props => props.charCount}em;
  border-radius: var(--border-radius-md);
  margin-right: 1em;
`;

export default class SpanSkeleton extends React.Component<SpanSkeletonProps> {
  charCount = this.props.size || Math.floor(Math.random() * 12) + 2;

  render() {
    return <Blob charCount={this.charCount} />;
  }
}
