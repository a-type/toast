import React, { FC, useState, useEffect, useCallback } from 'react';
import {
  makeStyles,
  Theme,
  Stepper,
  Step,
  StepButton,
  Typography,
} from '@material-ui/core';
import { useAnimation, motion, AnimatePresence } from 'framer-motion';
import * as colors from '../../../themes/colors';
import clsx from 'clsx';
import BackdropArt from '../../brand/BackdropArt';

export interface PlanDeviceExampleProps {
  className?: string;
}

const useStyles = makeStyles<Theme, PlanDeviceExampleProps>(theme => ({
  word: {
    borderRadius: '4px',
    borderWidth: '4px',
    borderStyle: 'solid',
    borderColor: 'inherit',
  },
  window: {
    flex: '0 0 auto',
    position: 'relative',
    margin: 'auto',
    borderRadius: '12px',
    boxShadow: `8px 8px 0px 2px ${colors.yellow[500]}`,
    pointerEvents: null,
    overflow: 'hidden',
    '&::after': {
      content: '""',
      position: 'absolute',
      zIndex: 10,
      top: -1,
      left: -1,
      bottom: -1,
      right: -1,
      borderRadius: 12,
    },
  },
  recipe: {
    display: 'grid',
    overflow: 'hidden',
    position: 'absolute',
    left: 16,
    right: 16,
    top: 16,
    bottom: 16,
  },
  details: {
    gridArea: 'details',
  },
  title: {
    color: colors.grey[500],
  },
  description: {
    color: colors.grey[200],
  },
  image: {
    gridArea: 'image',
    //backgroundImage: `url(${recipeImage})`,
    position: 'relative',
    overflow: 'hidden',
  },
  backdropArt: {
    zIndex: 1,
  },
  ingredients: {
    gridArea: 'ingredients',
    color: colors.grey[200],
  },
  shoppingList: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    borderRadius: 12,
    color: colors.grey[300],
    background: `linear-gradient(130deg, ${colors.grey[100]} 0%, ${colors.white[500]} 60%, ${colors.green[50]} 100%)`,
    padding: 16,
    paddingTop: 32,
    boxShadow: `0 -4px 8px 0 #00000040`,
  },
  container: {
    width: '100%',
    maxWidth: '500px',
    height: '450px',
    padding: 16,
  },
  copyContainer: {
    position: 'relative',
    height: '250px',
  },
  copy: {
    margin: 'auto',
    position: 'absolute',
    left: 16,
    right: 16,
    top: 16,
    bottom: 16,
  },
  copyTitle: {},
  copyBody: {},
}));

type AnimationStage = 'recipe' | 'feed' | 'shoppingList' | 'cook';

export const PlanDeviceExample: FC<PlanDeviceExampleProps> = props => {
  const classes = useStyles(props);

  const [stage, setStageState] = useState<AnimationStage>('recipe');
  const controls = useAnimation();

  const [wasTimerInterrupted, setWasTimerInterrupted] = useState(false);

  const setStage = useCallback(
    (s: AnimationStage) => {
      setStageState(s);
      controls.start(s);
    },
    [setStageState, controls],
  );

  const manuallySetStage = useCallback(
    (s: AnimationStage) => {
      setWasTimerInterrupted(true);
      setStage(s);
    },
    [setStage, setWasTimerInterrupted],
  );

  useEffect(() => {
    if (!wasTimerInterrupted) {
      const handle = setTimeout(() => {
        setStage(stages[(stages.indexOf(stage) + 1) % stages.length]);
      }, 7000);
      return () => clearTimeout(handle);
    }
  }, [stage, setStage, wasTimerInterrupted]);

  const currentCopy = copyContent[stage];

  return (
    <>
      <motion.div
        className={clsx(classes.container, props.className)}
        animate={controls}
        initial="recipe"
        variants={containerVariants}
      >
        <motion.div
          className={classes.window}
          variants={windowVariants}
          positionTransition
        >
          <motion.div variants={windowSizerVariants} />

          <motion.div variants={recipeVariants} className={classes.recipe}>
            <motion.div variants={imageVariants} className={classes.image}>
              <BackdropArt className={classes.backdropArt} />
            </motion.div>
            <motion.div variants={detailsVariants} className={classes.details}>
              <motion.div className={classes.title}>
                <motion.div
                  variants={titleWordVariants}
                  className={classes.word}
                  style={{
                    width: '80%',
                  }}
                />
              </motion.div>
              <motion.div className={classes.description}>
                {[10, 20, 64, 20, 40, 16].map((len, idx) => (
                  <div
                    className={classes.word}
                    key={idx}
                    style={{
                      width: `${len}%`,
                      marginRight: '3%',
                      marginBottom: '4px',
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
            <motion.div className={classes.ingredients}>
              {[30, 40, 60, 45, 66, 78, 30].map((len, idx) => (
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    marginBottom: 8,
                  }}
                  key={idx}
                >
                  <div
                    className={classes.word}
                    style={{ width: '4px', marginRight: '2px' }}
                  />
                  <div className={classes.word} style={{ width: `${len}%` }} />
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={shoppingListVariants}
            className={classes.shoppingList}
          >
            {[30, 40, 60, 45, 66, 78, 30].map((len, idx) => (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: 8,
                }}
                key={idx}
              >
                <div
                  className={classes.word}
                  style={{ width: '4px', marginRight: '2px' }}
                />
                <div className={classes.word} style={{ width: `${len}%` }} />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
      <Stepper nonLinear activeStep={stages.indexOf(stage)}>
        {stages.map(stage => (
          <Step key={stage}>
            <StepButton onClick={() => manuallySetStage(stage)} />
          </Step>
        ))}
      </Stepper>
      <motion.div className={classes.copyContainer}>
        <AnimatePresence>
          <motion.div
            className={classes.copy}
            key={stage}
            initial={{ opacity: 0, top: 64 }}
            animate={{ opacity: 1, top: 16 }}
            exit={{ opacity: 0, top: 64 }}
          >
            <Typography
              variant="h2"
              component={motion.h2 as any}
              className={classes.copyTitle}
              gutterBottom
            >
              {currentCopy.title}
            </Typography>
            <Typography
              component={motion.p as any}
              className={classes.copyBody}
            >
              {currentCopy.body}
            </Typography>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </>
  );
};

const stages: AnimationStage[] = ['recipe', 'feed', 'shoppingList', 'cook'];

const copyContent = {
  recipe: {
    title: "All of the Internet's Recipes",
    body:
      'Bring all your favorites. We make it easy to scan recipes from across the web and add them to your collection.',
  },
  feed: {
    title: 'Quickly Plan Your Week',
    body: 'Add recipes and notes to each day with a few taps.',
  },
  shoppingList: {
    title: 'Shopping Made Simple',
    body:
      'Each week we create a shopping list for you based on the recipes you chose.',
  },
  cook: {
    title: "Know what you're cooking",
    body:
      "When it's mealtime, you can get to your recipe fast and get to work.",
  },
};

const containerVariants = {
  recipe: {
    display: 'flex',
    flexDirection: 'column' as 'column',
  },
  feed: {
    display: 'flex',
    flexDirection: 'row' as 'row',
  },
  shoppingList: {
    display: 'flex',
    flexDirection: 'row' as 'row',
  },
  cook: {
    display: 'flex',
    flexDirection: 'row' as 'row',
  },
};

const windowVariants = {
  recipe: {
    width: '100%',
    background: `linear-gradient(130deg, ${colors.grey[100]} 0%, ${colors.white[500]} 60%, ${colors.green[50]} 100%)`,
  },
  feed: {
    width: '50%',
    background: `linear-gradient(130deg, ${colors.yellow[900]} 0%, ${colors.yellow[700]} 60%, ${colors.yellow[900]} 100%)`,
  },
  shoppingList: {
    width: '50%',
  },
  cook: {
    width: '50%',
    background: `linear-gradient(130deg, ${colors.grey[100]} 0%, ${colors.white[500]} 60%, ${colors.green[50]} 100%)`,
  },
};

const windowSizerVariants = {
  recipe: {
    width: '100%',
    paddingTop: '56.25%',
  },
  feed: {
    width: '100%',
    paddingTop: '177.77778%',
  },
  shoppingList: {
    width: '100%',
    paddingTop: '177.77778%',
  },
  cook: {
    width: '100%',
    paddingTop: '177.77778%',
  },
};

const recipeVariants = {
  recipe: {
    gridTemplateRows: 'auto auto',
    gridTemplateColumns: '1fr 2fr',
    gridTemplateAreas: '"image details" "ingredients ingredients"',
    backgroundColor: 'transparent',
    gap: '16px',
    height: '100%',
    opacity: 1,
  },
  feed: {
    gridTemplateRows: '3fr 5fr 0',
    gridTemplateAreas:
      '"image image" "details details" "ingredients ingredients"',
    gap: '8px',
    backgroundColor: colors.yellow[500],
    borderRadius: 8,
    height: '50%',
    opacity: 1,
  },
  shoppingList: {
    opacity: 0,
  },
  cook: {
    opacity: 1,
    gridTemplateRows: 'auto auto auto',
    backgroundColor: 'transparent',
    borderRadius: 0,
    height: '100%',
  },
};

const imageVariants = {
  recipe: {
    borderRadius: '8px',
    width: '100%',
    height: '100%',
    minHeight: 0,
  },
  feed: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    minHeight: '50px',
  },
  cook: {
    borderBottomRightRadius: '8px',
    borderBottomLeftRadius: '8px',
    minHeight: 50,
  },
};

const titleWordVariants = {
  recipe: {
    borderWidth: '16px',
    borderRadius: '16px',
    marginBottom: '16px',
  },
  feed: {
    borderWidth: '8px',
    borderRadius: '8px',
    marginBottom: '8px',
  },
};

const detailsVariants = {
  recipe: {
    padding: 0,
  },
  feed: {
    padding: '8px',
  },
};

const shoppingListVariants = {
  recipe: {
    opacity: 0,
    bottom: '-300px',
  },
  feed: {
    opacity: 0,
    bottom: '-300px',
  },
  shoppingList: {
    opacity: 1,
    bottom: 0,
  },
  cook: {
    opacity: 0,
    bottom: '-300px',
  },
};
