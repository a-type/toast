import React from 'react';
import styled, { StyledComponentClass } from 'styled-components';
import { getSize, Size } from 'theme';
import Span from './Span';

interface PProps {
  spaceBelow?: Size | string;
  textSize?: Size;
}

interface PWithSkeleton extends StyledComponentClass<PProps, {}> {
  Skeleton?: React.ComponentClass<{}>;
}

const P = styled<PProps, 'p'>('p')`
  font-size: var(${props => `--font-size-${props.textSize || 'md'}`});
  margin-top: -0.16em;
  margin-bottom: calc(${props => getSize(props.spaceBelow)} - 0.36em);

  & > ${Span} {
    margin-top: auto;
    margin-bottom: auto;
  }
` as PWithSkeleton;

P.Skeleton = class PSkeleton extends React.PureComponent {
  wordCount = Math.floor(Math.random() * 8) + 4;

  render() {
    return (
      <P>
        {new Array(this.wordCount).fill(null).map((_, idx) => (
          <Span.Skeleton key={idx} />
        ))}
      </P>
    );
  }
};

P.defaultProps = {
  spaceBelow: 'lg',
};

export default P;
