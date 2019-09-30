import React, { FC, HTMLAttributes } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { LocalDiningTwoTone } from '@material-ui/icons';
import clsx from 'clsx';

export type RecipeImageProps = HTMLAttributes<HTMLDivElement> & {
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

    '&::after': {
      content: '""',
      display: 'block',
      paddingBottom: '42%',
    },
  }),
  icon: {
    margin: 'auto',
  },
}));

export const RecipeImage: FC<RecipeImageProps> = props => {
  const classes = useStyles(props);
  const { recipe, ...rest } = props;
  const coverImageUrl = recipe.coverImageUrl;

  return (
    <div {...rest} className={clsx(classes.image, props.className)}>
      {!coverImageUrl && (
        <LocalDiningTwoTone fontSize="large" className={classes.icon} />
      )}
    </div>
  );
};
