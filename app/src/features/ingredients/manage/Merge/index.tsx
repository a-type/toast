import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Picker } from 'features/ingredients';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Layer, Box, Button } from 'grommet';
import { Heading } from 'components/text';

const MergeIngredients = gql`
  mutation MergeIngredients($primary: ID!, $secondary: ID!) {
    mergeIngredients(primary: $primary, secondary: $secondary) {
      id
      name
      alternateNames
    }
  }
`;

export interface IngredientMergerProps extends RouteComponentProps {
  ingredientId: string;
}

interface IngredientMergerState {
  showModal: boolean;
  value: any; // FIXME
  error: Error;
}

class IngredientMerger extends React.Component<
  IngredientMergerProps,
  IngredientMergerState
> {
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
        <Button onClick={this.toggleModal} label="Merge" />
        <Mutation mutation={MergeIngredients}>
          {merge =>
            this.state.showModal && (
              <Layer onClickOutside={this.toggleModal}>
                <Heading level="3">Merge with:</Heading>
                <Picker value={this.state.value} onChange={this.setValue} />
                <Box direction="row">
                  <Button
                    margin={{ right: 'medium' }}
                    onClick={() => this.setState({ showModal: false })}
                    label="Cancel"
                  />
                  <Button
                    onClick={async () => {
                      try {
                        await merge({
                          variables: {
                            secondary: this.props.ingredientId,
                            primary: this.state.value.id,
                          },
                        });
                        this.props.history.replace(
                          `/ingredients/${this.state.value.id}`,
                        );
                      } catch (err) {
                        this.setState({ error: err });
                      }
                    }}
                    label="Merge"
                  />
                </Box>
                {this.state.error && (
                  <div>Error: {this.state.error.message}</div>
                )}
              </Layer>
            )
          }
        </Mutation>
      </React.Fragment>
    );
  }
}

export default withRouter(IngredientMerger);
