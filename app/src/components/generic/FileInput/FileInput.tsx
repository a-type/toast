import * as React from 'react';
import readAndCompressImage from 'browser-image-resizer';
import { Box, Button } from '@material-ui/core';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface FileInputProps
  extends Omit<React.HTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string | Blob;
  onChange?(file: Blob): any;
  config?: any;
  id?: string;
  name?: string;
  type?: string;
  label?: string;
  disabled?: boolean;
}

const inputStyle: React.CSSProperties = {
  display: 'block',
  height: 0,
  width: 0,
  margin: 0,
  padding: 0,
  position: 'absolute',
  opacity: 0,
};

const defaultImageConfig = {
  quality: 0.9,
  maxWidth: 1080,
  maxHeight: 900,
};

const FileInput: React.SFC<FileInputProps> = ({
  value = null,
  onChange = () => {},
  config,
  type = 'image',
  label = 'Select file',
  id,
  ...rest
}) => {
  const [preview, setPreview] = React.useState<string>(null);
  const { current: elementId } = React.useRef<string>(
    id || `fileUpload_${Math.floor(Math.random() * 100000000)}`,
  );

  const handleChange = async ev => {
    const file = ev.target.files && ev.target.files[0];
    if (file) {
      if (type === 'image') {
        const resizedImage = await readAndCompressImage(
          file,
          config || defaultImageConfig,
        );
        onChange(resizedImage);
      } else {
        onChange(file);
      }
    } else {
      onChange(null);
    }
  };

  React.useEffect(() => {
    if (typeof value === 'string') {
      setPreview(value);
    } else if (value) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(value);
    }
  }, [value]);

  return (
    <Box flexDirection="row">
      <input
        type="file"
        style={inputStyle}
        id={elementId}
        onChange={handleChange}
        {...rest}
      />
      <Button variant="text" {...{ htmlFor: elementId } as any}>
        {label}
      </Button>
      {preview && (
        <img
          src={preview}
          css={{
            width: '41px',
            height: '41px',
            backgroundSize: 'cover',
            borderRadius: '8px',
            marginLeft: '8px',
          }}
        />
      )}
    </Box>
  );
};

export default FileInput;
