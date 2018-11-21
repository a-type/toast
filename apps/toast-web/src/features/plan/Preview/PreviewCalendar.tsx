import * as React from 'react';
import Meal from './Meal';
import gql from 'graphql-tag';
import groupMeals from 'features/plan/groupMeals';
import { PlanPreviewMeal } from 'generated/schema';
import { Layout } from './components';
import { H3 } from 'components/typeset';

export interface PlanPreviewProps {
  week: PlanPreviewMeal.Fragment[];
}

const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const PlanPreviewCalendar: React.SFC<PlanPreviewProps> & {
  fragments: { week: any };
} = ({ week }) => {
  const grouped = groupMeals<PlanPreviewMeal.Fragment>(week);

  return (
    <div>
      {grouped.map((meals, dayIndex) => {
        return (
          <Layout>
            <H3>{DAYS[dayIndex]}</H3>
            <Meal meal={meals[0]} key="breakfast" data-grid-area="breakfast" />
            <Meal meal={meals[1]} key="lunch" data-grid-area="lunch" />
            <Meal meal={meals[2]} key="dinner" data-grid-area="dinner" />
          </Layout>
        );
      })}
    </div>
  );
};

PlanPreviewCalendar.fragments = {
  week: Meal.fragments.meal,
};

export default PlanPreviewCalendar;