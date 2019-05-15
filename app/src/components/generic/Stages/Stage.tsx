import React from 'react';
import {
  Number,
  HeadingRow,
  StageContent,
  Summary,
  StageContainer,
} from './components';
import { Consumer } from './Context';
import CrossFade from '../CrossFade/CrossFade';
import { Heading } from 'components/text';

export interface StageProps {
  title: string;
  summary?: string;
  stageIndex: number;
  children?: React.ReactNode;
}

const Stage: React.SFC<StageProps> = ({
  title,
  summary,
  stageIndex,
  children,
}) => (
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
            <Heading level="2" margin={{ top: 'auto', bottom: '0' }}>
              {title}
            </Heading>
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

export default Stage;
