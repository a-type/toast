import * as React from 'react';
import Correction from './Correction';
import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo-hooks';
import Loader from 'components/generic/Loader';
import ErrorMessage from 'components/generic/ErrorMessage';

enum CorrectionStatus {
  Submitted = 'Submitted',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
}

export const AcceptRecipeIngredientCorrectionMutation = gql`
  mutation AcceptRecipeIngredientCorrection($id: ID!) {
    acceptRecipeIngredientCorrection(id: $id) {
      id
      status
    }
  }
`;

export const RejectRecipeIngredientCorrectionMutation = gql`
  mutation RejectRecipeIngredientCorrection($id: ID!) {
    rejectRecipeIngredientCorrection(id: $id) {
      id
      status
    }
  }
`;

export const ListRecipeIngredientCorrectionsQuery = gql`
  query ListRecipeIngredientCorrections(
    $offset: Int!
    $status: CorrectionStatus!
  ) {
    recipeIngredientCorrections(
      pagination: { offset: $offset }
      filter: { status: $status }
    ) {
      id
      status
      recipeIngredientId
      correctionType
      correctedText
      correctedFields {
        unit
        unitStart
        unitEnd
        quantity
        quantityStart
        quantityEnd
        foodStart
        foodEnd
        food {
          id
          name
        }
      }
    }
  }
`;

interface ManageRecipeIngredientsProps {}

export const ManageRecipeIngredients: React.SFC<
  ManageRecipeIngredientsProps
> = ({}) => {
  const mutateAccept = useMutation(AcceptRecipeIngredientCorrectionMutation);
  const mutateReject = useMutation(RejectRecipeIngredientCorrectionMutation);
  const { data, error, loading } = useQuery(
    ListRecipeIngredientCorrectionsQuery,
    {
      variables: { offset: 0, status: CorrectionStatus.Submitted },
    },
  );

  const accept = (id: string) => mutateAccept({ variables: { id } });
  const reject = (id: string) => mutateReject({ variables: { id } });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const { recipeIngredientCorrections } = data;

  if (!recipeIngredientCorrections.length) {
    return <div>No submitted corrections</div>;
  }

  return (
    <div>
      {recipeIngredientCorrections
        .filter(corr => corr.status === 'Submitted')
        .map(corr => (
          <Correction correction={corr} accept={accept} reject={reject} />
        ))}
    </div>
  );
};

export default ManageRecipeIngredients;
