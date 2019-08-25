import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { LocalDiningTwoTone } from '@material-ui/icons';

export type RecipeImageProps = {
  recipe: {
    coverImageUrl?: string;
  };
};

const useStyles = makeStyles<Theme, RecipeImageProps>(theme => ({
  image: props => ({
    backgroundSize: 'cover',
    borderRadius: '24px',
    backgroundColor: theme.palette.grey[200],
    backgroundImage: props.recipe.coverImageUrl
      ? `url(${props.recipe.coverImageUrl})`
      : 'none',
    backgroundPosition: '50% 50%',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    color: theme.palette.grey[500],

    [theme.breakpoints.down('md')]: {
      height: '200px',
    },

    [theme.breakpoints.up('md')]: {
      '&::after': {
        content: '""',
        display: 'block',
        paddingBottom: '100%',
      },
    },
  }),
  icon: {
    margin: 'auto',
  },
}));

export const RecipeImage: FC<RecipeImageProps> = props => {
  const { coverImageUrl } = props.recipe;
  const classes = useStyles(props);

  return (
    <div className={classes.image}>
      {!coverImageUrl && (
        <LocalDiningTwoTone fontSize="large" className={classes.icon} />
      )}
    </div>
  );
};
