import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const RecordView = gql`
  mutation RecordView($recipeId: ID!) {
    recordRecipeView(id: $recipeId) {
      id
      views
    }
  }
`;

export interface ViewSpyProps {
  view(): any;
}

class ViewSpy extends React.PureComponent<ViewSpyProps> {
  timer = null;

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.props.view();
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

export default ({ recipeId }: { recipeId: string }) => (
  <Mutation mutation={RecordView} variables={{ recipeId }}>
    {mutate => <ViewSpy view={mutate} />}
  </Mutation>
);
