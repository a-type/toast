import React from 'react';
import { Input } from 'components/generic';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import gql from 'graphql-tag';
import { parse } from 'query-string';
import debounce from 'lodash.debounce';

const AddMatchFilter = gql`
  mutation AddMatchFilter($value: String!) {
    addSearchFilter(type: "match", subject: $value, display: $value) @client {
      id
      type
      subject
    }
  }
`;

const GetSearchInputValue = gql`
  query GetSearchInputValue {
    searchInputValue
  }
`;

const SetSearchInputValue = gql`
  mutation SetSearchInputValue($value: String!) {
    setSearchInputValue(value: $value) @client
  }
`;

const ResetSearch = gql`
  mutation ResetSearch {
    resetSearch @client
  }
`;

class SearchBar extends React.Component {
  state = {
    returnTo: '/',
    inputValue: this.props.value,
  };

  handleInputChanged = ev => {
    this.setState({ inputValue: ev.target.value });
    this.debouncedSetMatchTerm();
  };

  setMatchTerm = () => this.props.setInputValue(this.state.inputValue);
  debouncedSetMatchTerm = debounce(this.setMatchTerm, 200);

  handleKeyDown = ev => {
    if (ev.key === 'Enter') {
      this.setState({
        inputValue: '',
      });
      this.props.addMatchFilter(this.state.inputValue);
    } else {
      const { history, location } = this.props;
      if (this.state.inputValue.length > 1 && location.pathname !== '/search') {
        this.setState({ returnTo: location.pathname });
        history.push('/search');
      }
    }
  };

  reset = async () => {
    const { history, reset } = this.props;

    this.setState({
      inputValue: '',
    });
    await reset();

    if (this.state.returnTo) {
      history.push(this.state.returnTo);
    }
  };

  render() {
    const { inputValue } = this.state;

    return (
      <Input.Group
        value={inputValue}
        onChange={this.handleInputChanged}
        placeholder="Search recipes or ingredients..."
        onKeyDown={this.handleKeyDown}
      >
        {inputValue.length > 0 && (
          <Input.Group.Button onClick={this.reset}>&times;</Input.Group.Button>
        )}
      </Input.Group>
    );
  }
}

export default compose(
  withRouter,
  graphql(GetSearchInputValue, {
    props: ({ data }) => ({ value: data && data.searchInputValue }),
  }),
  graphql(SetSearchInputValue, {
    props: ({ mutate }) => ({
      setInputValue: value => mutate({ variables: { value } }),
    }),
  }),
  graphql(AddMatchFilter, {
    props: ({ mutate }) => ({
      addMatchFilter: value => mutate({ variables: { value } }),
    }),
  }),
  graphql(ResetSearch, { props: ({ mutate }) => ({ reset: mutate }) }),
)(SearchBar);
