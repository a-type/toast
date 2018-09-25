import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Button, Modal } from 'components/generic';
import { Picker } from 'features/ingredients';
import { H3 } from 'components/typeset';

const MergeIngredients = gql`
  mutation MergeIngredients($primary: ID!, $secondary: ID!) {
    mergeIngredients(primary: $primary, secondary: $secondary) {
      id
      name
      alternateNames
    }
  }
`;

export default class IngredientMerger extends React.Component {
  state = {
    showModal: false,
    value: null,
    error: null,
  };

  toggleModal = () =>
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  setValue = value => this.setState({ value });

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.toggleModal}>Merge</Button>
        <Mutation mutation={MergeIngredients}>
          {merge => (
            <Modal visible={this.state.showModal} onClose={this.toggleModal}>
              <H3>Merge with:</H3>
              <Picker value={this.state.value} onChange={this.setValue} />
              <Button
                onClick={async () => {
                  try {
                    await merge({
                      variables: {
                        primary: this.props.ingredientId,
                        secondary: this.state.value.id,
                      },
                    });
                    this.setState({ showModal: false, value: null });
                  } catch (err) {
                    this.setState({ error: err });
                  }
                }}
              >
                Merge
              </Button>
              {this.state.error && <div>Error: {error.message}</div>}
            </Modal>
          )}
        </Mutation>
      </React.Fragment>
    );
  }
}
