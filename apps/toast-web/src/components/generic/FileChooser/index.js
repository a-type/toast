import React from 'react';
import { Icon, Pill, Button } from 'components/generic';
import readAndCompressImage from 'browser-image-resizer';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
const Input = styled.input`
  display: block;
  height: 0;
  width: 0;
  margin: 0;
  padding: 0;
  position: absolute;
  opacity: 0;
`;
const Label = Button.withComponent('label');
const Preview = styled.div`
  width: 41px;
  height: 41px;
  background-image: url(${props => props.src});
  background-size: cover;
  border-radius: var(--border-radius-md);
  margin-left: var(--spacing-sm);
`;

const defaultImageConfig = {
  quality: 0.9,
  maxWidth: 1080,
  maxHeight: 900,
};

export default class ImageChooser extends React.Component {
  static defaultProps = {
    id: null,
    preview: null,
  };

  state = {
    preview: null,
  };

  id = `fileUpload_${Math.floor(Math.random() * 1000000000)}`;

  componentDidMount() {
    if (this.props.value && typeof this.props.value === 'string') {
      this.setState({ preview: this.props.value });
    }
  }

  componentDidUpdate(oldProps) {
    if (oldProps.value !== this.props.value) {
      if (typeof this.props.value === 'string') {
        this.setState({ preview: this.props.value });
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.setState({ preview: reader.result });
        };
        reader.readAsDataURL(this.props.value);
      }
    }
  }

  handleChange = async ev => {
    const config = this.props.config || defaultImageConfig;
    const file = ev.target.files && ev.target.files[0];

    if (file) {
      if (this.props.type === 'image') {
        const resizedImage = await readAndCompressImage(file, config);
        this.props.onChange(resizedImage);
      } else {
        this.props.onChange(file);
      }
    } else {
      this.props.onChange(null);
    }
  };

  render() {
    const { id, children, onChange, config, value, ...rest } = this.props;
    const { preview } = this.state;

    return (
      <Container>
        <Input
          style={{ display: 'none' }}
          type="file"
          id={id || this.id}
          onChange={this.handleChange}
          {...rest}
        />
        <Label htmlFor={id || this.id}>{children}</Label>
        {preview && <Preview src={preview} />}
      </Container>
    );
  }
}
