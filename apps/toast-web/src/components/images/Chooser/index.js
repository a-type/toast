// @flow
import React, { type Node } from 'react';
import { Icon, Pill } from 'components/generic';

type Props = {
  onImageChange(image: ?File): any,
  id: ?string,
  children: Node,
};

export default class ImageChooser extends React.Component<Props> {
  static defaultProps = {
    id: null,
  };

  id: string = `fileUpload_${Math.floor(Math.random() * 1000000000)}`;

  handleChange = (ev: Event) => {
    if (ev.target.files && ev.target.files[0]) {
      this.props.onImageChange(ev.target.files[0]);
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
