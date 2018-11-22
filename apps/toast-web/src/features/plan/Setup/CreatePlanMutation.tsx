import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import gql from 'graphql-tag';
import { CreatePlan } from 'generated/schema';

export const Document = gql`
  mutation CreatePlan {
    createPlan {
      id
    }
  }
`;

interface CreatePlanMutationProps {
  variables?: CreatePlan.Variables;
  skip?: boolean;
  children(
    mutateFn: MutationFn<CreatePlan.Mutation, CreatePlan.Variables>,
  ): React.ReactNode;
}

const CreatePlanMutation: React.SFC<CreatePlanMutationProps> = props => (
  <Mutation<CreatePlan.Mutation, CreatePlan.Variables>
    mutation={Document}
    {...props}
  />
);

export default CreatePlanMutation;
