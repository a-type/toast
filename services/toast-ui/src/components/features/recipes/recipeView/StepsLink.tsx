import * as React from 'react';
import Link, { LinkProps } from 'components/generic/Link';
import { Fab, makeStyles } from '@material-ui/core';
import { ArrowForwardIosTwoTone } from '@material-ui/icons';

export interface StepsLinkProps extends LinkProps {
  recipe: {
    sourceUrl: string;
  };
}

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2) + 55,
    right: theme.spacing(2),

    [theme.breakpoints.up('md')]: {
      bottom: theme.spacing(2),
    },
  },
}));

export const RecipeStepsLink: React.SFC<StepsLinkProps> = ({ recipe }) => {
  const classes = useStyles({});

  return (
    <Fab
      color="primary"
      variant="extended"
      href={recipe.sourceUrl}
      className={classes.fab}
    >
      Start Cooking
      <ArrowForwardIosTwoTone />
    </Fab>
  );
};
