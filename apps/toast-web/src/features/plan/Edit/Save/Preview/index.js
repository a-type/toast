import React from 'react';
import gql from 'fraql';
import Day from './Day';
import { MealGrid } from 'features/plan/Edit/components';
import { HelpText } from 'components/typeset';

const PlanPreview = ({ plan }) => (
  <React.Fragment>
    <MealGrid>
      {({ getMealStyle }) =>
        plan.days.map((day, idx) => (
          <Day day={day} key={idx} dayIndex={idx} getMealStyle={getMealStyle} />
        ))
      }
    </MealGrid>
    {plan.warnings &&
      plan.warnings.length > 0 &&
      plan.warnings.map(warning => (
        <HelpText key={warning}>{warning}</HelpText>
      ))}
  </React.Fragment>
);

PlanPreview.fragments = {
  plan: gql`
    fragment PlanPreview on Plan {
      id
      days {
        ${Day.fragments.day}
      }
      warnings
    }
  `,
};

export default PlanPreview;
