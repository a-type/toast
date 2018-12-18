import React from 'react';
import styled, { StyledComponentClass } from 'styled-components';
import { getSize, Size } from 'theme';
import Span from './Span';

export interface PProps {
  spaceBelow?: Size | string;
  textSize?: Size;
}
export interface PSkeletonProps {
  maxWords?: number;
}

interface PWithSkeleton extends StyledComponentClass<PProps, {}> {
  Skeleton?: React.ComponentClass<PSkeletonProps>;
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

P.Skeleton = class PSkeleton extends React.PureComponent<PSkeletonProps> {
  static defaultProps = {
    maxWords: 8,
  };

  wordCount: number;

  constructor(props) {
    super(props);
    const { maxWords = 8 } = props;
    this.wordCount =
      Math.floor(Math.random() * (maxWords * (3 / 4))) +
      Math.max(1, Math.floor(maxWords / 4));
  }

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
