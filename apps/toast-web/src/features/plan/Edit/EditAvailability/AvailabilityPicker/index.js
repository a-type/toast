import React from 'react';
import Select from './Select';

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
    const { value } = this.props;
    const { loading } = this.state;

    return (
      <Select
        value={{ value }}
        onChange={this.handleChange}
        isLoading={loading}
      />
    );
  }
}
