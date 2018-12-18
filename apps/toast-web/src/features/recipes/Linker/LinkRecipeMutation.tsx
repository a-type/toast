import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import gql from 'graphql-tag';
import { LinkRecipe } from 'generated/schema';

export const Document = gql`
  mutation LinkRecipe($url: String!) {
    linkRecipe(input: { url: $url }) {
      recipe {
        id
      }
      problems
    }
  }
`;

interface LinkRecipeMutationProps {
  variables?: LinkRecipe.Variables;
  skip?: boolean;
  children(
    mutateFn: MutationFn<LinkRecipe.Mutation, LinkRecipe.Variables>,
  ): React.ReactNode;
}

const LinkRecipeMutation: React.SFC<LinkRecipeMutationProps> = props => (
  <Mutation<LinkRecipe.Mutation, LinkRecipe.Variables>
    mutation={Document}
    {...props}
  />
);

export default LinkRecipeMutation;
