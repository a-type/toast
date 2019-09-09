import React, { useRef, FC } from 'react';
import { Typography, makeStyles, Theme } from '@material-ui/core';

export type TextSkeletonProps = {
  size?: number;
};

const useStyles = makeStyles<Theme, TextSkeletonProps>(theme => ({
  blob: {
    borderColor: 'inherit',
    borderRadius: theme.spacing(2),
    borderStyle: 'solid',
    opacity: 0.1,
    height: '1em',
    borderWidth: '1em',
    display: 'inline-block',
    '& + &': {
      marginLeft: '1ch',
    },
  },
}));

export const TextSkeleton: FC<TextSkeletonProps> = ({ size }) => {
  const classes = useStyles({ size });

  const { current: charCount } = useRef(
    size || Math.floor(Math.random() * 32) + 3,
  );

  return <span className={classes.blob} style={{ width: `${charCount}ch` }} />;
};

export const HeadingSkeleton: FC<any> = ({ size, ...rest }) => {
  return (
    <Typography {...(rest as any)}>
      <TextSkeleton size={size} />
    </Typography>
  );
};

export const ParagraphSkeleton: FC<TextSkeletonProps & { words?: number }> = ({
  size,
  words,
  ...rest
}) => {
  const { current: wordCount } = useRef(
    words || Math.floor(Math.random() * 8) + 4,
  );

  return (
    <Typography variant="body1" {...(rest as any)}>
      {new Array(wordCount)
        .fill(null)
        .reduce((all, _, idx) => [...all, <TextSkeleton key={idx} />, ' '], [])}
    </Typography>
  );
};

export const LabelSkeleton: FC<TextSkeletonProps> = ({ size }) => (
  <Typography variant="subtitle2">
    <TextSkeleton size={size} />
  </Typography>
);
