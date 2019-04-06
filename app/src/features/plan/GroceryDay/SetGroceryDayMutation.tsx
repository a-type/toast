import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import gql from 'graphql-tag';
import { SetGroceryDay } from 'generated/schema';

export const Document = gql`
  mutation SetGroceryDay($groceryDay: Int!) {
    setGroceryDay(groceryDay: $groceryDay) {
      id
      groceryDay
    }
  }
`;

interface SetGroceryDayMutationProps {
  variables?: SetGroceryDay.Variables;
  skip?: boolean;
  children(
    mutateFn: MutationFn<SetGroceryDay.Mutation, SetGroceryDay.Variables>,
  ): React.ReactNode;
}

const SetGroceryDayMutation: React.SFC<SetGroceryDayMutationProps> = props => (
  <Mutation<SetGroceryDay.Mutation, SetGroceryDay.Variables>
    mutation={Document}
    {...props}
  />
);

export default SetGroceryDayMutation;
