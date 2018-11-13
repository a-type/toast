import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Pill, Type, Display, Controls, RemoveButton } from './components';

const RemoveFilter = gql`
  mutation RemoveFilter($id: ID!) {
    removeSearchFilter(id: $id) @client {
      id
    }
  }
`;

const typeNameMap = {
  match: 'Matches: ',
  includeIngredient: 'With: ',
  excludeIngredient: 'Without: ',
};

const colorMap = {
  match: 'brand',
  includeIngredient: 'positive',
  excludeIngredient: 'negative',
};

export default class Filter extends React.PureComponent {
  render() {
    const { type, display, id } = this.props;

    return (
      <Mutation mutation={RemoveFilter} variables={{ id }}>
        {remove => (
          <Pill>
            <Type color={colorMap[type]}>{typeNameMap[type]}</Type>
            <Display>{display}</Display>
            <Controls>
              <RemoveButton onClick={remove} />
            </Controls>
          </Pill>
        )}
      </Mutation>
    );
  }
}
