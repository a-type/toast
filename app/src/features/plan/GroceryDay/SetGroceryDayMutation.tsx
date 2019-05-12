import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import gql from 'graphql-tag';

export type SetGroceryDayVariables = {
  groceryDay: number;
};

export type SetGroceryDayMutation = {
  setGroceryDay: {
    id: string;
    groceryDay: number;
  };
};

export const Document = gql`
  mutation SetGroceryDay($groceryDay: Int!) {
    setGroceryDay(groceryDay: $groceryDay) {
      id
      groceryDay
    }
  }
`;

interface SetGroceryDayMutationProps {
  variables?: SetGroceryDayVariables;
  skip?: boolean;
  children(
    mutateFn: MutationFn<SetGroceryDayMutation, SetGroceryDayVariables>,
  ): React.ReactNode;
}

const SetGroceryDayMutation: React.SFC<SetGroceryDayMutationProps> = props => (
  <Mutation<SetGroceryDayMutation, SetGroceryDayVariables>
    mutation={Document}
    {...props}
  />
);

export default SetGroceryDayMutation;
