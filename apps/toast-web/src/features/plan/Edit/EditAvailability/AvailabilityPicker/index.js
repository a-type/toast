import React from 'react';
import Select from './Select';
import Image from './Image';

export default class AvailabilityPicker extends React.Component {
  state = {
    loading: false,
  };

  handleChange = async ({ value }) => {
    this.setState({ loading: true });
    await this.props.onChange(value);
    this.setState({ loading: false });
  };

  render() {
    const { value, ...rest } = this.props;
    const { loading } = this.state;

    return (
      <Image value={value} {...rest}>
        <Select
          value={{ value }}
          onChange={this.handleChange}
          isLoading={loading}
        />
      </Image>
    );
  }
}
