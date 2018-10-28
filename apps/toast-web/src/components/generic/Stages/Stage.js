import React from 'react';
import {
  Number,
  HeadingRow,
  StageContent,
  Summary,
  StageContainer,
} from './components';
import { Consumer } from './Context';
import { H2 } from 'components/typeset';
import CrossFade from '../CrossFade/CrossFade';

export default ({ title, summary, stageIndex, children }) => (
  <Consumer>
    {({ stage, completedStage, onStageChanged }) => {
      const available =
        completedStage >= stageIndex - 1 && stage !== stageIndex;

      return (
        <StageContainer active={stage === stageIndex}>
          <HeadingRow
            onClick={available ? () => onStageChanged(stageIndex) : undefined}
          >
            <Number
              active={stage === stageIndex}
              complete={completedStage >= stageIndex}
              available={available}
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
      );
    }}
  </Consumer>
);
