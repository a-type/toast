import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const RecordView = gql`
  mutation RecordView($recipeId: ID!) {
    recordRecipeView(id: $recipeId) {
      id
      views
    }
  }
`;

class ViewSpy extends React.PureComponent {
  timer = null;

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.props.view(this.props.recipeId);
    }, 10000);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    return null;
  }
}

export default graphql(RecordView, {
  props: ({ mutate }) => ({
    view: id => mutate({ variables: { recipeId: id } }),
  }),
})(ViewSpy);
