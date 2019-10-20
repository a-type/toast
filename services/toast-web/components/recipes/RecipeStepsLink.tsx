import * as React from 'react';
import Link, { LinkProps } from 'components/Link';
import { makeStyles } from '@material-ui/core';
import { ArrowForwardIosTwoTone } from '@material-ui/icons';
import { toReadableFraction } from 'readable-fractions';
import { Fab } from 'components/Fab';

export interface StepsLinkProps extends LinkProps {
  recipe: {
    id: string;
    sourceUrl: string;
  };
  servingsMultiplier?: number;
}

const useStyles = makeStyles(theme => ({}));

export const RecipeStepsLink: React.SFC<StepsLinkProps> = ({
  recipe,
  servingsMultiplier,
}) => {
  const classes = useStyles({});

  const handleNavigate = async () => {
    console.log('multiplier', servingsMultiplier);
    if (!!servingsMultiplier && servingsMultiplier !== 1) {
      const title =
        servingsMultiplier === 2
          ? 'Remember to double it!'
          : servingsMultiplier === 3
          ? 'Remember to triple it!'
          : servingsMultiplier === 0.5
          ? 'Remember to half it!'
          : `Remember: ${toReadableFraction(
              servingsMultiplier,
              true,
            )} this recipe!`;

      if (navigator && navigator.serviceWorker) {
        console.log('Waiting for notification permission');
        await Notification.requestPermission();
        console.log('Waiting for worker registration');
        if (Notification.permission === 'granted') {
          const worker = await navigator.serviceWorker.getRegistration();

          console.log('Showing notification');
          worker.showNotification(title, {
            body: `You planned to make x${toReadableFraction(
              servingsMultiplier,
              true,
            )} this recipe, so multiply all ingredient quantities when cooking. Some sites let you modify the servings yourself.`,
          });
        }
      }
    }
  };

  if (recipe.sourceUrl) {
    return (
      <Fab
        color="primary"
        variant="extended"
        href={recipe.sourceUrl}
        target={'_blank'}
        rel={'noopener'}
        onClick={handleNavigate}
      >
        Start Cooking
        <ArrowForwardIosTwoTone />
      </Fab>
    );
  }

  return (
    <Fab
      color="primary"
      variant="extended"
      component={Link}
      to={`/recipes/${recipe.id}/steps`}
    >
      Start Cooking
      <ArrowForwardIosTwoTone />
    </Fab>
  );
};
