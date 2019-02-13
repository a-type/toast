import React from 'react';
import { Input } from 'components/generic';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import gql from 'graphql-tag';
import { parse } from 'query-string';
import debounce from 'lodash.debounce';
import styled from 'styled-components';
import { Box } from 'grommet';

const Container = styled.div`
  width: 100%;
  margin-bottom: var(--spacing-lg);

  & > * {
    width: 100%;
  }
`;

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
  query SearchBarGetSearchInputValue {
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

  commitSearch = () => {
    this.setState({
      inputValue: '',
    });
    this.props.addMatchFilter(this.state.inputValue);
  };

  handleKeyDown = ev => {
    if (ev.key === 'Enter') {
      this.commitSearch();
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
    const { history, reset, ...rest } = this.props;
    const { inputValue } = this.state;

    return (
      <Container>
        <Box direction="row">
        <Input
          value={inputValue}
          onChange={this.handleInputChanged}
          placeholder="Search recipes or ingredients..."
          onKeyDown={this.handleKeyDown}
          groupProps={rest}
        />
          {inputValue.length > 0 && (
            <React.Fragment>
              <Button onClick={this.commitSearch}
                label={`Match "${inputValue}"`} />
              <Button.Negative onClick={this.reset} label="&times;"/>
            </React.Fragment>
          )}
        </Box>
      </Container>
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
