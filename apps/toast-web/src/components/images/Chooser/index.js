// @flow
import React, { type Node } from 'react';
import { Icon, Pill } from 'components/generic';
import readAndCompressImage from 'browser-image-resizer';

const defaultImageConfig = {
  quality: 0.9,
  maxWidth: 1080,
  maxHeight: 900,
};

type Props = {
  onImageChange(image: ?File): any,
  id: ?string,
  children: Node,
  config: {},
};

export default class ImageChooser extends React.Component<Props> {
  static defaultProps = {
    id: null,
  };

  id: string = `fileUpload_${Math.floor(Math.random() * 1000000000)}`;

  handleChange = async (ev: Event) => {
    const config = this.props.config || defaultImageConfig;
    const file = ev.target.files && ev.target.files[0];

    if (file) {
      const resizedImage = await readAndCompressImage(file, config);
      this.props.onImageChange(resizedImage);
    } else {
      this.props.onImageChange(null);
    }
  };

  render() {
    const { id } = this.props;

    return (
      <div>
        <input
          style={{ display: 'none' }}
          type="file"
          id={id || this.id}
          onChange={this.handleChange}
        />
        <label htmlFor={id || this.id} style={{ cursor: 'pointer' }}>
          {this.props.children}
        </label>
      </div>
    );
  }
}
