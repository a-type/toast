import * as React from 'react';
import Correction from './Correction';
import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { Loader } from 'components/generic/Loader/Loader';
import ErrorMessage from 'components/generic/ErrorMessage';
import { useAlerts } from 'contexts/AlertContext';
import logger from 'logger';

enum CorrectionStatus {
  Submitted = 'Submitted',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
}

export const AcceptRecipeIngredientCorrectionMutation = gql`
  mutation AcceptRecipeIngredientCorrection($id: ID!) {
    acceptIngredientCorrection(input: { id: $id }) {
      id
      status
    }
  }
`;

export const RejectRecipeIngredientCorrectionMutation = gql`
  mutation RejectRecipeIngredientCorrection($id: ID!) {
    rejectIngredientCorrection(input: { id: $id }) {
      id
      status
    }
  }
`;

export const ListRecipeIngredientCorrectionsQuery = gql`
  query ListRecipeIngredientCorrections {
    ingredientCorrections {
      id
      status
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
  const alerts = useAlerts();

  const accept = async (id: string) => {
    try {
      await mutateAccept({ variables: { id } });
    } catch (err) {
      logger.fatal(err);
      alerts.showAlert({
        content: 'Failed to accept correction',
      });
    }
  };
  const reject = async (id: string) => {
    try {
      await mutateReject({ variables: { id } });
    } catch (err) {
      logger.fatal(err);
      alerts.showAlert({
        content: 'Failed to reject correction',
      });
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const { ingredientCorrections } = data;

  if (!ingredientCorrections.length) {
    return <div>No submitted corrections</div>;
  }

  return (
    <div>
      {ingredientCorrections
        .filter(corr => corr.status === 'Submitted')
        .map(corr => (
          <Correction correction={corr} accept={accept} reject={reject} />
        ))}
    </div>
  );
};

export default ManageRecipeIngredients;
