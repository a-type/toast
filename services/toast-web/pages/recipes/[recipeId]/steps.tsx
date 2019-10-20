import React, { useState } from 'react';
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
  StepButton,
} from '@material-ui/core';
import useFullRecipe from 'hooks/features/useFullRecipe';
import ErrorMessage from 'components/ErrorMessage';
import { pathOr } from 'ramda';
import SwipeableViews from 'react-swipeable-views';
import { FullRecipeStep } from 'hooks/features/fragments';
import { Loader } from 'components/Loader';

export interface RecipeStepsPageProps {
  recipeId: string;
}

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

const RecipeStepsPage = (props: RecipeStepsPageProps) => {
  const classes = useStyles(props);
  const { recipeId } = props;

  const { data, loading, error } = useFullRecipe(recipeId);

  const [activeStep, setActiveStep] = useState(0);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    console.error(error);
    return <ErrorMessage error={error} />;
  }

  const steps = (pathOr([], ['recipe', 'stepsConnection', 'edges'], data) as ({
    node: FullRecipeStep;
  }[])).map(({ node }) => node);

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Stepper
          activeStep={activeStep}
          nonLinear
          className={classes.stepNumbers}
        >
          {steps.map((_step, idx) => (
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
                {step.text}
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

RecipeStepsPage.getInitialProps = ({ query }) => {
  return { recipeId: query.recipeId };
};

export default RecipeStepsPage;
