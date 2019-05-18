import React, { FC } from 'react';
import PlanSummary from 'features/plan/Summary/Summary';
import Column from 'components/layout/Column';
import ShoppingListSummary from 'features/shoppingList/Summary/Summary';
import { Button } from 'grommet';
import { Heading } from 'components/text';
import usePlan from 'features/plan/usePlan';
import useGroceryDay from 'features/plan/useGroceryDay';
import { GlobalLoader } from 'components/generic/Loader/GlobalLoader';
import ErrorMessage from 'components/generic/ErrorMessage';
import { PlanSetup } from 'features/plan/Setup/Setup';
import { BackdropArt, Logo } from 'components/brand';
import { Icon, Link } from 'components/generic';
import useMedia from 'hooks/useMedia';
import { NAV_SIDEBAR_MIN_WIDTH_PX } from 'constants/breakpoints';

interface StartPageProps {}

export const StartPage: FC<StartPageProps> = ({}) => {
  const isMobile = useMedia(`(max-width: ${NAV_SIDEBAR_MIN_WIDTH_PX - 1}px)`);

  const [plan, planLoading, planError, planResult] = usePlan();
  const [groceryDay, groceryDayLoading, groceryDayError] = useGroceryDay();

  const anyLoading = planLoading || groceryDayLoading;
  const allLoading = planLoading && groceryDayLoading;

  if (planError) {
    return <ErrorMessage full error={planError} />;
  }

  const mainContent = allLoading ? null : !planLoading && !plan.length ? (
    <PlanSetup onCreated={planResult.refetch} />
  ) : (
    <>
      <PlanSummary loading={planLoading} planDays={plan} error={planError} />
      <Heading level="3">Shopping</Heading>
      <ShoppingListSummary
        loading={groceryDayLoading}
        groceryDay={groceryDay}
        error={groceryDayError}
      />
      <Heading level="3">Recipes</Heading>
    </>
  );

  return (
    <Column css={{ position: 'relative' }}>
      {isMobile && (
        <>
          <BackdropArt
            fade
            css={{
              height: '60vh',
            }}
          />
          <Logo
            size="5vh"
            css={{
              marginRight: 'auto',
              marginBottom: 'var(--spacing-lg)',
              boxShadow: '0 2px 4px 0 var(--color-shadow)',
            }}
          />
          <Link
            to="/settings"
            css={{
              position: 'absolute',
              top: 'var(--spacing-sm)',
              right: 'var(--spacing-sm)',
            }}
          >
            <Button
              icon={
                <Icon name="settings" color="var(--color-white)" size="24px" />
              }
              aria-label="Settings"
            />
          </Link>
        </>
      )}
      {anyLoading && <GlobalLoader />}
      {mainContent}
    </Column>
  );
};

export default StartPage;
