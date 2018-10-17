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
    const { value, style, ...rest } = this.props;
    const { loading } = this.state;

    return (
      <div style={style}>
        <Select
          value={{ value }}
          onChange={this.handleChange}
          isLoading={loading}
          {...rest}
        />
      </div>
    );
  }
}
