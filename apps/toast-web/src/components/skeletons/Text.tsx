import React, { SFC, useRef } from 'react';
import styled from 'styled-components';
import { Heading, HeadingProps, ParagraphProps, Paragraph } from 'grommet';

export type TextSkeletonProps = {
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

export const TextSkeleton: SFC<TextSkeletonProps> = ({ size }) => {
  const { current: charCount } = useRef(
    size || Math.floor(Math.random() * 4) + 2,
  );

  return <Blob charCount={charCount} />;
};

export const HeadingSkeleton: SFC<HeadingProps & TextSkeletonProps> = ({
  size,
  ...rest
}) => {
  return (
    <Heading {...rest as any}>
      <TextSkeleton size={size} />
    </Heading>
  );
};

export const ParagraphSkeleton: SFC<
  ParagraphProps & TextSkeletonProps & { words?: number }
> = ({ size, words, ...rest }) => {
  const { current: wordCount } = useRef(
    words || Math.floor(Math.random() * 8) + 4,
  );

  return (
    <Paragraph {...rest as any}>
      {new Array(wordCount)
        .fill(null)
        .reduce((all, _, idx) => [...all, <TextSkeleton key={idx} />, ' '], [])}
    </Paragraph>
  );
};
