import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { equals } from 'ramda';

export default class AutoSave extends React.Component {
  static defaultProps = {
    render: () => null,
    timeout: 300,
  };

  state = {
    isSaving: false,
    lastSaved: null,
    saveError: null,
  };

  componentDidUpdate(prevProps) {
    if (!equals(prevProps.values, this.props.values)) {
      this.save();
    }
  }

  save = debounce(async () => {
    this.setState({ isSaving: true, saveError: null });
    try {
      await this.props.onSave(this.props.values);
      this.setState({ isSaving: false, lastSaved: new Date() });
    } catch (err) {
      this.setState({ isSaving: false, saveError: err.message });
    }
  }, this.props.timeout);

  render() {
    return this.props.render(this.state);
  }
}
