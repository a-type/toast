import React from 'react';
import styled from 'styled-components';

const Blob = styled.span`
  display: inline-block;
  background: var(--color-gray-lightest);
  height: 1em;
  width: ${props => props.charCount}em;
  border-radius: var(--border-radius-md);
  margin-right: 1em;
`;

export default class SpanSkeleton extends React.Component {
  charCount = Math.floor(Math.random() * 12) + 2;

  render() {
    return <Blob charCount={this.charCount} />;
  }
}
