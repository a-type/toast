import * as React from 'react';
import CalendarPlanQuery from './CalendarPlanQuery';
import { GlobalLoader } from 'components/generic/Loader';
import { Disconnected } from 'components/generic';
import { Content } from 'components/layouts';
import { addDays, isSameDay } from 'date-fns';
import logger from 'logger';
import { pathOr } from 'ramda';
import CalendarWeeklyView from './WeekView';
import CalendarDayView from './DayView';
import { PlanMeal } from 'generated/schema';
import { cold } from 'react-hot-loader';
import { Redirect } from 'react-router-dom';
import GroceryDayBanner from '../GroceryDayBanner';

interface CalendarProps {
  date: Date;
}

interface CalendarViewProps {
  meals: PlanMeal[];
  groceryDay: number;
  loadNextWeek(): void;
}

const CalendarView: React.SFC<CalendarViewProps> = cold(
  ({ meals, groceryDay, loadNextWeek }) => {
    const [dateIndex, setDateIndex] = React.useState(meals[0].dateIndex);

    const dayMeals = meals
      .filter(meal => meal.dateIndex === dateIndex)
      .sort((a, b) => a.mealIndex - b.mealIndex);

    return (
      <React.Fragment>
        <GroceryDayBanner groceryDay={groceryDay} />
        <Content contentArea="secondary" scroll>
          {({ setActiveContent }) => (
            <CalendarWeeklyView
              setActiveDateIndex={dateIndex => {
                setDateIndex(dateIndex);
                setActiveContent('main');
              }}
              meals={meals}
              groceryDay={groceryDay}
              loadNextWeek={loadNextWeek}
            />
          )}
        </Content>
        <Content contentArea="main">
          <CalendarDayView meals={dayMeals} />
        </Content>
      </React.Fragment>
    );
  },
);

const Calendar: React.SFC<CalendarProps> = ({ date }) => {
  return (
    <CalendarPlanQuery
      variables={{ startDate: date, endDate: addDays(date, 7) }}
      options={{ fetchPolicy: 'cache-and-network' }}
    >
      {({ data, loading, error, fetchMore, refetch }) => {
        if (loading) {
          return <GlobalLoader />;
        }

        if (error) {
          logger.fatal(error);
          return <Disconnected />;
        }

        if (
          !data ||
          !data.group ||
          !data.group.plan ||
          !data.group.plan.meals.length
        ) {
          return <Redirect to="/plan/setup" />;
        }

        const groceryDay = pathOr(0, ['group', 'plan', 'groceryDay'], data);
        const meals = pathOr(
          [],
          ['group', 'plan', 'meals'],
          data,
        ) as PlanMeal[];

        const lastDay = meals[meals.length - 1].date;
        const loadNextWeek = async () => {
          await fetchMore({
            variables: {
              startDate: addDays(lastDay, 1),
              endDate: addDays(lastDay, 8),
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return prev;
              }
              const updated = {
                ...prev,
                group: {
                  ...prev.group,
                  plan: {
                    ...prev.group.plan,
                    meals: [
                      ...prev.group.plan.meals,
                      ...fetchMoreResult.group.plan.meals,
                    ],
                  },
                },
              };

              return updated;
            },
          });
        };

        return (
          <CalendarView
            meals={meals}
            groceryDay={groceryDay}
            loadNextWeek={loadNextWeek}
          />
        );
      }}
    </CalendarPlanQuery>
  );
};

export default cold(Calendar);
