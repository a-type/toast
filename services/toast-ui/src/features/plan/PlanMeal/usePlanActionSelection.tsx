import { useReducer, useCallback } from 'react';
import { PlanActionType } from './types';

export enum SelectionStage {
  Initial,
  Action,
  Details,
}

type PlanActionSelectionState = {
  stage: SelectionStage;
  actionType: PlanActionType;
};

const DEFAULT_STATE: PlanActionSelectionState = {
  stage: SelectionStage.Initial,
  actionType: null,
};

type ActionType = 'begin' | 'selectActionType' | 'cancel';
type Action = {
  type: ActionType;
  payload?: any;
};

const reducer = (
  state: PlanActionSelectionState = DEFAULT_STATE,
  action: Action,
) => {
  switch (action.type) {
    case 'begin':
      return {
        ...state,
        // FIXME: when there are more actions? Or redesign this whole thign....
        //stage: SelectionStage.Action,
        stage: SelectionStage.Details,
      };
    case 'cancel':
      return DEFAULT_STATE;
    case 'selectActionType':
      return {
        ...state,
        stage: SelectionStage.Details,
        actionType: action.payload,
      };
    default:
      return DEFAULT_STATE;
  }
};

export default (): [
  PlanActionSelectionState,
  { begin(): void; cancel(): void; selectActionType(t: PlanActionType): void }
] => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  const begin = useCallback(() => dispatch({ type: 'begin' }), []);
  const cancel = useCallback(() => dispatch({ type: 'cancel' }), []);
  const selectActionType = useCallback(
    (actionType: PlanActionType) =>
      dispatch({ type: 'selectActionType', payload: actionType }),
    [],
  );

  return [state, { begin, cancel, selectActionType }];
};
