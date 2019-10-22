import React, { FC, useState, useEffect } from 'react';
import {
  makeStyles,
  Theme,
  ButtonBase,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import { CloudUploadTwoTone } from '@material-ui/icons';
import clsx from 'clsx';

export interface UploadableImageProps {
  value: FileOrUrl;
  onChange: (value: File) => any;
  className?: string;
}
type FileOrUrl = File | string;

const useStyles = makeStyles<Theme, UploadableImageProps>(theme => ({
  root: {
    position: 'relative',
    overflow: 'hidden',
    '&:hover > $icon': {
      opacity: 0.5,
    },
    backgroundColor: theme.palette.grey[100],
  },
  icon: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '64px',
    opacity: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  placeholder: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    color: theme.palette.grey[900],
  },
  loader: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

export const UploadableImage: FC<UploadableImageProps> = props => {
  const classes = useStyles(props);
  const { value, onChange, className } = props;

  const [displayFile, setDisplayFile] = useState<string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // convert File values to binary strings for display on value change
  useEffect(() => {
    // iife for async within useEffect
    (async () => {
      if (value === null) return;

      const converted =
        typeof value === 'string'
          ? value
          : await new Promise<string>(resolve => {
              const reader = new FileReader();
              reader.onload = () => {
                resolve(reader.result as string);
              };
              reader.readAsDataURL(value);
            });
      setDisplayFile(converted);
    })();
  }, [value, setDisplayFile]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (files: any[]) => {
      try {
        setLoading(true);
        await onChange(files[0]);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <ButtonBase className={clsx(classes.root, className)} {...getRootProps()}>
      <img src={displayFile} className={classes.image} />
      <CloudUploadTwoTone className={classes.icon} />
      <input {...getInputProps()} />
      {!displayFile && (
        <Typography variant="caption" className={classes.placeholder}>
          Tap to select an image
        </Typography>
      )}
      {loading && <CircularProgress className={classes.loader} />}
    </ButtonBase>
  );
};
