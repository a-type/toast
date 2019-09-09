import * as React from 'react';
import { useDebounce } from 'use-debounce';
import { InlineLoader } from './InlineLoader';
import { makeStyles, Theme } from '@material-ui/core';

export type LoaderProps = {
  full?: boolean;
  size?: string;
};

const useStyles = makeStyles<Theme, LoaderProps>(theme => ({
  root: props => ({
    position: 'fixed',
    bottom: props.full ? 'auto' : '88px',
    right: props.full ? 'auto' : theme.spacing(3),
    top: props.full ? '50%' : 'auto',
    left: props.full ? '50%' : 'auto',
    transform: props.full ? 'translate(-50%, -50%)' : 'translate(0, 0)',
    pointerEvents: 'none',
    transition: '0.25s ease all',
  }),
}));

export const Loader: React.FC<LoaderProps> = props => {
  const classes = useStyles(props);
  const [debouncedFull] = useDebounce(props.full, 500);
  return (
    <div className={classes.root}>
      <InlineLoader size={props.size || (debouncedFull ? '30vw' : '12vw')} />
    </div>
  );
};
