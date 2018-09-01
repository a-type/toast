import React from 'react';
import styled from 'styled-components';
import { getSize } from 'theme';
import Span from '../Span';

const P = styled.p`
  font-size: var(${props => `--font-size-${props.textSize || 'md'}`});
  margin-top: -0.16em;
  margin-bottom: calc(${props => getSize(props.spaceBelow)} - 0.36em);
`;

P.Skeleton = class PSkeleton extends React.PureComponent {
  wordCount = Math.floor(Math.random() * 8) + 4;

  render() {
    return (
      <P>
        {new Array(this.wordCount)
          .fill(null)
          .map((_, idx) => <Span.Skeleton key={idx} />)}
      </P>
    );
  }
};

P.defaultProps = {
  spaceBelow: 'lg',
};

export default P;
