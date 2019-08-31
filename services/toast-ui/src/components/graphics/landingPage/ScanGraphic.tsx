import React, { FC, useState, useEffect } from 'react';
import { useTheme } from '@material-ui/styles';
import { Theme, makeStyles } from '@material-ui/core';
import { motion, useAnimation } from 'framer-motion';
import { Logo } from 'components/brand';
import * as colors from 'themes/colors';
import { darken } from '@material-ui/core/styles';

export type ScanGraphicProps = {};

const useStyles = makeStyles(theme => ({
  square: {},
  container: {
    background: colors.white[50],
    borderRadius: '8px',
    padding: theme.spacing(2),
    overflow: 'hidden',
  },
  word: {
    borderRadius: '4px',
    borderColor: 'inherit',
    borderWidth: '4px',
    borderStyle: 'solid',
  },
}));

export const ScanGraphic: FC<ScanGraphicProps> = ({}) => {
  const theme = useTheme<Theme>();
  const classes = useStyles({});
  const controls = useAnimation();

  const sequence = async () => {
    const delay = (time = 2000) =>
      new Promise(resolve => setTimeout(resolve, time));
    await controls.start('default');
    await delay();
    await controls.start('scan');
    await delay();
    await controls.start('capture');
    await delay(500);
    await controls.start('save');
    await delay(7000);
    setTimeout(sequence, 1);
  };

  useEffect(() => {
    sequence();
  }, []);

  const recipeVariants = {
    default: {
      padding: theme.spacing(2),
      marginRight: theme.spacing(4),
      height: '100%',
      width: '60%',
      left: '50%',
      top: '50%',
      display: 'grid',
      gridTemplateRows: 'auto auto',
      gridTemplateColumns: '1fr 2fr',
      gridTemplateAreas: '"image details" "ingredients ingredients"',
      gap: theme.spacing(1),
    },
    scan: {
      transition: {
        staggerChildren: 0.05,
      },
    },
    capture: {
      padding: 0,
      height: '50%',
      width: '25%',
      gridTemplateRows: '3fr 5fr 0',
      gridTemplateAreas:
        '"image image" "details details" "ingredients ingredients"',
    },
  };

  const feedVariants = {
    default: {
      opacity: 0,
    },
    save: {
      opacity: 1,
    },
  };

  const recipeImageVariants = {
    default: {
      backgroundColor: colors.grey[200],
      borderRadius: '8px',
      width: '100%',
      height: '100%',
    },
    scan: {
      backgroundColor: colors.darkGreen[500],
    },
    capture: {},
  };

  const recipeTitleVariants = {
    default: {
      color: colors.grey[200],
    },
    scan: {
      color: colors.yellow[500],
    },
    capture: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  };

  const recipeDescriptionVariants = {
    default: {
      color: colors.grey[200],
    },
    scan: {
      color: colors.yellow[100],
    },
    capture: {
      height: '20px',
      overflow: 'hidden',
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  };

  const recipeIngredientVariants = {
    default: {
      color: colors.grey[200],
      height: 'auto',
    },
    scan: {
      color: colors.red[500],
    },
    capture: {
      overflow: 'hidden',
    },
  };

  return (
    <motion.div
      style={{
        position: 'relative',
        height: '200px',
        width: '100%',
        maxWidth: '400px',
        margin: '24px',
      }}
      initial="default"
      animate={controls}
    >
      <motion.div
        id="animation-recipe"
        style={{
          overflow: 'hidden',
          marginTop: 'auto',
          marginBottom: 'auto',
          position: 'absolute',
          zIndex: 1,
          transform: 'translate(-50%, -50%)',
        }}
        className={classes.container}
        variants={recipeVariants}
      >
        <motion.div
          id="animation-recipe-image"
          variants={recipeImageVariants}
          positionTransition
          className={classes.square}
          style={{ gridArea: 'image' }}
        />
        <motion.div
          style={{ flex: '1', color: 'inherit', gridArea: 'details' }}
        >
          <motion.div
            id="animation-recipe-title"
            variants={recipeTitleVariants}
            style={{
              width: '60%',
              marginBottom: theme.spacing(1),
            }}
            positionTransition
          >
            <div
              className={classes.word}
              style={{ width: '100%', height: '100%', borderWidth: '8px' }}
            />
          </motion.div>
          <motion.div
            id="animation-recipe-description"
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
            variants={recipeDescriptionVariants}
          >
            {[10, 20, 64, 40, 20, 16].map((len, idx) => (
              <div
                className={classes.word}
                key={idx}
                style={{
                  width: `${len}%`,
                  marginRight: '3%',
                  marginBottom: theme.spacing(0.5),
                }}
              />
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          id="animation-recipe-ingredients"
          variants={recipeIngredientVariants}
          style={{ gridArea: 'ingredients' }}
          positionTransition
        >
          {[30, 40, 60, 45, 66, 78, 30].map((len, idx) => (
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                marginBottom: theme.spacing(1),
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
        id="animation-feed"
        style={{
          position: 'absolute',
          width: '30%',
          left: '50%',
          top: 0,
          height: '100%',
          transform: 'translate(-50%, 0)',
          backgroundColor: colors.yellow[500],
        }}
        className={classes.container}
        variants={feedVariants}
      >
        <Logo size="16px" variant="small" />
      </motion.div>
    </motion.div>
  );
};
