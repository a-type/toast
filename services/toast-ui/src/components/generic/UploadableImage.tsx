import React, { FC, useState, useEffect } from 'react';
import { makeStyles, Theme, ButtonBase } from '@material-ui/core';
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
}));

export const UploadableImage: FC<UploadableImageProps> = props => {
  const classes = useStyles(props);
  const { value, onChange, className } = props;

  const [displayFile, setDisplayFile] = useState<string>(null);

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
    onDrop: (files: any[]) => onChange(files[0]),
  });

  return (
    <ButtonBase className={clsx(classes.root, className)} {...getRootProps()}>
      <img src={displayFile} className={classes.image} />
      <CloudUploadTwoTone className={classes.icon} />
      <input {...getInputProps()} />
    </ButtonBase>
  );
};
