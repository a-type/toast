import React, { useRef, FC } from 'react';
import styled from 'styled-components';
import { ParagraphProps, Paragraph } from 'grommet';
import { Label, Heading, HeadingProps } from 'components/text';

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

export const TextSkeleton: FC<TextSkeletonProps> = ({ size }) => {
  const { current: charCount } = useRef(
    size || Math.floor(Math.random() * 4) + 2,
  );

  return <Blob charCount={charCount} />;
};

export const HeadingSkeleton: FC<HeadingProps & TextSkeletonProps> = ({
  size,
  ...rest
}) => {
  return (
    <Heading {...rest as any}>
      <TextSkeleton size={size} />
    </Heading>
  );
};

export const ParagraphSkeleton: FC<
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

export const LabelSkeleton: FC<TextSkeletonProps> = ({ size }) => (
  <Label>
    <TextSkeleton size={size} />
  </Label>
);
