import * as React from 'react';
import ListRecipeIngredientCorrectionsQuery from '../queries/ListRecipeIngredientCorrectionsQuery';
import {
  AcceptRecipeIngredientCorrectionMutation,
  RejectRecipeIngredientCorrectionMutation,
} from '../mutations';
import Correction from './Correction';
import { CorrectionStatus } from 'generated/schema';

interface ManageRecipeIngredientsProps {}

const ManageRecipeIngredients: React.SFC<
  ManageRecipeIngredientsProps
> = ({}) => {
  return (
    <AcceptRecipeIngredientCorrectionMutation>
      {mutateAccept => {
        const accept = (id: string) => mutateAccept({ variables: { id } });
        return (
          <RejectRecipeIngredientCorrectionMutation>
            {mutateReject => {
              const reject = (id: string) =>
                mutateReject({ variables: { id } });
              return (
                <ListRecipeIngredientCorrectionsQuery
                  variables={{ offset: 0, status: CorrectionStatus.Submitted }}
                >
                  {({ data, loading, error }) => {
                    if (loading) {
                      return null;
                    }

                    if (error) {
                      return <div>{error.message}</div>;
                    }

                    const { recipeIngredientCorrections } = data;

                    if (!recipeIngredientCorrections.length) {
                      return <div>No submitted corrections</div>;
                    }

                    return (
                      <div>
                        {recipeIngredientCorrections.map(corr => (
                          <Correction
                            correction={corr}
                            accept={accept}
                            reject={reject}
                          />
                        ))}
                      </div>
                    );
                  }}
                </ListRecipeIngredientCorrectionsQuery>
              );
            }}
          </RejectRecipeIngredientCorrectionMutation>
        );
      }}
    </AcceptRecipeIngredientCorrectionMutation>
  );
};

export default ManageRecipeIngredients;
