import React, { FC } from 'react';

export interface HeadingProps {
  level: '1' | '2' | '3' | '4' | '5' | '6';
}

const weights = [700, 700, 700, 400, 400, 400];
const sizes = [
  'var(--font-size-xxl)',
  'var(--font-size-xl)',
  'var(--font-size-lg)',
  'var(--font-size-lg)',
  'var(--font-size-md)',
  'var(--font-size-md)',
];

export const Heading: FC<HeadingProps> = ({
  level = '1',
  children,
  ...rest
}) => {
  const levelInt = parseInt(level, 10) - 1;
  const Tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = ('h' + level) as any;

  return (
    <Tag
      css={{
        fontFamily: 'var(--font-fancy)',
        fontWeight: weights[levelInt],
        fontSize: sizes[levelInt],
        color: 'var(--color-heading)',
        opacity: levelInt < 3 ? 1 : 0.8,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Heading;
