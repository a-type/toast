import React, { FC, useCallback, useState, useEffect } from 'react';
import { makeStyles, Theme, Button, Box } from '@material-ui/core';
import { CloudUploadTwoTone } from '@material-ui/icons';
import { ButtonProps } from '@material-ui/core/Button';
import { useDropzone } from 'react-dropzone';
import clsx from 'clsx';

export interface FileUploaderProps {
  ButtonProps?: ButtonProps;
  value: FileOrUrl[];
  onChange: (value: File[]) => any;
}

type FileOrUrl = File | string;

const useStyles = makeStyles<Theme, FileUploaderProps>(theme => ({
  icon: {
    marginRight: theme.spacing(1),
  },
  button: {},
  previewArea: {
    marginTop: theme.spacing(1),
  },
  preview: {
    width: '80px',
    height: '80px',
    backgroundSize: 'cover',
  },
}));

export const FileUploader: FC<FileUploaderProps> = props => {
  const classes = useStyles(props);
  const {
    children = 'Upload',
    ButtonProps = { variant: 'contained', className: null },
    onChange,
    value,
  } = props;

  const [displayFiles, setDisplayFiles] = useState<string[]>([]);

  // convert File values to binary strings for display on value change
  useEffect(() => {
    // iife for async within useEffect
    (async () => {
      const converted = await Promise.all(
        (value || []).map(item => {
          if (typeof item === 'string') {
            return Promise.resolve(item);
          } else {
            return new Promise<string>(resolve => {
              const reader = new FileReader();
              reader.onload = () => {
                resolve(reader.result as string);
              };
              reader.readAsDataURL(item);
            });
          }
        }),
      );
      setDisplayFiles(converted);
    })();
  }, [value, setDisplayFiles]);

  const handleDrop = useCallback(
    (files: File[]) => {
      onChange(files);
    },
    [onChange],
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

  return (
    <Box
      display="flex"
      flexDirection="column"
      {...getRootProps({ className: 'dropzone' })}
    >
      <Button
        {...({ component: 'label' } as any)}
        {...ButtonProps}
        className={clsx(classes.button, ButtonProps.className)}
      >
        <CloudUploadTwoTone className={classes.icon} /> {children}
        <input {...getInputProps()} />
      </Button>
      {displayFiles.length && (
        <Box
          display="flex"
          flexDirection="horizontal"
          className={classes.previewArea}
        >
          {displayFiles.map(url => (
            <div
              key={url}
              className={classes.preview}
              style={{ backgroundImage: `url(${url})` }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
