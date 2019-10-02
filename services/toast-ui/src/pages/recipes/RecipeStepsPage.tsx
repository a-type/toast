import React, { FC, useState } from 'react';
import {
  makeStyles,
  Theme,
  Container,
  Paper,
  Stepper,
  Step,
  Typography,
  Box,
  Button,
  StepLabel,
  StepButton,
} from '@material-ui/core';
import { RouteComponentProps } from 'react-router';
import useFullRecipe from 'hooks/features/useFullRecipe';
import { Loader } from 'components/generic/Loader';
import ErrorMessage from 'components/generic/ErrorMessage';
import { pathOr } from 'ramda';
import SwipeableViews from 'react-swipeable-views';

export interface RecipeStepsPageProps
  extends RouteComponentProps<{ recipeId: string }> {}

const useStyles = makeStyles<Theme, RecipeStepsPageProps>(theme => ({
  container: {
    flex: 1,
  },
  paper: {
    height: '100%',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  stepNumbers: {
    marginBottom: theme.spacing(3),
  },
  stepContent: {
    flex: 1,
  },
  actions: {
    '& > * + *': {
      marginLeft: theme.spacing(1),
    },
  },
}));

export const RecipeStepsPage: FC<RecipeStepsPageProps> = props => {
  const classes = useStyles(props);
  const {
    match: {
      params: { recipeId },
    },
  } = props;

  const { data, loading, error } = useFullRecipe(recipeId);

  const [activeStep, setActiveStep] = useState(0);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    console.error(error);
    return <ErrorMessage error={error} />;
  }

  const steps = pathOr([], ['recipe', 'steps'], data) as string[];

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Stepper
          activeStep={activeStep}
          nonLinear
          className={classes.stepNumbers}
        >
          {steps.map((step, idx) => (
            <Step completed={idx < activeStep}>
              <StepButton onClick={() => setActiveStep(idx)}></StepButton>
            </Step>
          ))}
        </Stepper>
        <Box className={classes.stepContent}>
          <SwipeableViews
            index={activeStep}
            onChangeIndex={idx => setActiveStep(idx)}
          >
            {steps.map((step, idx) => (
              <Typography paragraph key={idx}>
                {step}
              </Typography>
            ))}
          </SwipeableViews>
        </Box>
        <Box display="flex" flexDirection="row" className={classes.actions}>
          <Button
            variant="text"
            onClick={() => setActiveStep(activeStep - 1)}
            disabled={activeStep === 0}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setActiveStep(activeStep + 1)}
            disabled={activeStep === steps.length - 1}
          >
            Next
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
