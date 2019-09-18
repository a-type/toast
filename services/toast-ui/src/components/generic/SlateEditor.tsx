import React, { FC, forwardRef, useCallback } from 'react';
import { makeStyles, Theme, Typography } from '@material-ui/core';
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

    width: '100%',

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

export const SlateEditor = forwardRef<Editor, SlateEditorProps>(
  (props, ref) => {
    const classes = useStyles(props);

    const renderMark = useCallback((props, editor, next) => {
      const { children, mark, attributes } = props;

      switch (mark.type) {
        case 'bold':
          return <strong {...attributes}>{children}</strong>;
        case 'italic':
          return <em {...attributes}>{children}</em>;
        case 'underlined':
          return <u {...attributes}>{children}</u>;
        default:
          return next();
      }
    }, []);

    const renderBlock = useCallback((props, editor, next) => {
      const { children, node, attributes } = props;

      switch (node.type) {
        case 'block-quote':
          return <blockquote {...attributes}>{children}</blockquote>;
        case 'bulleted-list':
          return <ul {...attributes}>{children}</ul>;
        case 'heading-one':
          return (
            <Typography variant="h2" {...attributes}>
              {children}
            </Typography>
          );
        case 'heading-two':
          return (
            <Typography variant="h3" {...attributes}>
              {children}
            </Typography>
          );
        case 'list-item':
          return <li {...attributes}>{children}</li>;
        case 'numbered-list':
          return <ol {...attributes}>{children}</ol>;
        default:
          return next();
      }
    }, []);

    return (
      <Editor
        {...props}
        ref={ref}
        className={clsx(classes.root, props.className)}
        renderMark={renderMark}
        renderBlock={renderBlock}
      />
    );
  },
);
