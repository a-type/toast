import React, { FC } from 'react';
import gql from 'graphql-tag';
import Link from 'components/text/Link';
import SaveButton from 'features/recipes/SaveButton/SaveButton';
import { Image, Layout } from './components';
import { path } from 'ramda';
import { HeadingSkeleton, ParagraphSkeleton } from 'components/skeletons';
import { Icon } from 'components/generic/Icon';
import { Box, Typography } from '@material-ui/core';
import { LocalDiningTwoTone } from '@material-ui/icons';

const truncate = (text: string, characters: number = 180) => {
  let trimmed = text.substr(0, characters);
  trimmed =
    trimmed.length < text.length
      ? trimmed.substr(0, Math.min(trimmed.length, trimmed.lastIndexOf(' ')))
      : trimmed;
  if (trimmed.length < text.length) {
    trimmed += '...';
  }
  return trimmed;
};

export interface SpotlightProps {
  showSave?: boolean;
  linkTitle?: boolean;
  recipe: {
    coverImageUrl?: string;
    id?: string;
    sourceUrl?: string;
    title: string;
    description: string;
    attribution?: string;
  };
}

export const Spotlight: FC<SpotlightProps> = ({
  recipe,
  linkTitle,
  showSave,
}) => {
  if (!recipe) {
    return null;
  }

  const coverImage = path<string>(['coverImageUrl'], recipe);

  return (
    <Layout>
      <Box data-grid-area="image">
        <Image src={coverImage}>
          {!coverImage && <LocalDiningTwoTone fontSize="large" />}
        </Image>
        {showSave && <SaveButton recipeId={recipe.id} />}
      </Box>
      <Box data-grid-area="details">
        {linkTitle ? (
          <Link to={!!recipe.id && `/recipes/${recipe.id}`}>
            <Typography variant="h1" gutterBottom>
              {recipe.title}
            </Typography>
          </Link>
        ) : (
          <Typography variant="h1" gutterBottom>
            {recipe.title}
          </Typography>
        )}
        {recipe.description && (
          <Typography variant="body1">
            {truncate(recipe.description)}
          </Typography>
        )}
        {recipe.attribution && (
          <Link to={recipe.sourceUrl} newTab>
            from {recipe.attribution}
          </Link>
        )}
      </Box>
    </Layout>
  );
};

export const SpotlightSkeleton = () => (
  <Layout>
    <Box data-grid-area="image">
      <Image>
        <Icon name="local_dining" size="100px" />
      </Image>
    </Box>
    <Box data-grid-area="details">
      <HeadingSkeleton level="1" />
      <ParagraphSkeleton />
    </Box>
  </Layout>
);

export const SpotlightFragments = {
  recipe: gql`
    fragment RecipeSpotlight on Recipe {
      description
      attribution
      sourceUrl
      coverImageUrl
    }
  `,
};

export default Spotlight;
