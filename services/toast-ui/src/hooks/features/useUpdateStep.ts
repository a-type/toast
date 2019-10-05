import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

export const UpdateStepMutation = gql`
  mutation UpdateStepMutation($input: UpdateStepInput!) {
    updateStep(input: $input) {
      step {
        id
        text
      }
    }
  }
`;

export type UpdateStepMutationResult = {
  updateStep: {
    step: {
      id: string;
      text: string;
    };
  };
};

export type UpdateStepMutationVariables = {
  input: {
    id: string;
    text?: string;
  };
};

export const useUpdateStep = (args = {}) =>
  useMutation<UpdateStepMutationResult, UpdateStepMutationVariables>(
    UpdateStepMutation,
    args,
  );
