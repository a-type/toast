import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { Editor, EditorProps } from 'slate-react';
import { fade } from '@material-ui/core/styles';
import { colors } from 'themes/colors';
import clsx from 'clsx';

export interface SlateEditorProps extends EditorProps {}

const useStyles = makeStyles<Theme, SlateEditorProps>(theme => ({
  root: {
    border: `1px solid ${
      theme.palette.type === 'light'
        ? fade(colors.black[500], 0.23)
        : fade(colors.white[500], 0.23)
    }`,
    borderRadius: theme.shape.borderRadius,
    padding: `18.5px 14px`,
    fontSize: theme.typography.pxToRem(16),
    lineHeight: 1,

    '&:focus': {
      borderColor: theme.palette.primary.main,
      boxShadow: `inset 0 0 0 1px ${theme.palette.primary.main}`,
    },
    '&:hover:not(:focus)': {
      borderColor: theme.palette.text.primary,
    },
    transition: theme.transitions.create(['border', 'color', 'boxShadow']),
  },
}));

export const SlateEditor: FC<SlateEditorProps> = props => {
  const classes = useStyles(props);

  return <Editor {...props} className={clsx(classes.root, props.className)} />;
};
