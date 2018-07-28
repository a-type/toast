import React from 'react';
import {
  Number,
  HeadingRow,
  StageContent,
  Summary,
  StageContainer,
} from './components';
import { Consumer } from './Context';
import { H2 } from 'components/generic';
import CrossFade from '../CrossFade';

export default ({ title, summary, stageIndex, children }) => (
  <Consumer>
    {({ stage, completedStage, onStageChanged }) => (
      <StageContainer>
        <HeadingRow>
          <Number
            active={stage === stageIndex}
            complete={completedStage >= stageIndex}
            onClick={
              completedStage >= stageIndex - 1 && stage !== stageIndex
                ? () => onStageChanged(stageIndex)
                : null
            }
          >
            {stageIndex + 1}
          </Number>
          <H2>{title}</H2>
        </HeadingRow>
        <CrossFade>
          {stage === stageIndex ? (
            <StageContent key="content">{children}</StageContent>
          ) : (
            <Summary key="summary">{summary}</Summary>
          )}
        </CrossFade>
      </StageContainer>
    )}
  </Consumer>
);