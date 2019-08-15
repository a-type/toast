import React, { FC } from 'react';
import gql from 'graphql-tag';
import Link from 'components/text/Link';
import { path } from 'ramda';
import { HeadingSkeleton, ParagraphSkeleton } from 'components/skeletons';
import { Icon } from 'components/generic/Icon';
import { Box, Typography } from '@material-ui/core';
import { LocalDiningTwoTone } from '@material-ui/icons';
import styled from 'styled-components';
import { RecipeSaveButton } from '../RecipeSaveButton';

const Image = styled<{ src?: string }, 'div'>('div')`
  background-size: cover;
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-200);
  background-image: ${props => (props.src ? `url(${props.src})` : 'none')};
  background-position: 50% 50%;
  position: relative;
  overflow: hidden;
  display: flex;
  color: var(--color-grey-500);

  & > * {
    margin: auto;
  }
`;

const Layout = styled<{}, 'div'>('div')`
  display: grid;
  grid-template-areas: 'image' 'details';
  grid-template-rows: 200px 3fr;
  gap: var(--spacing-lg);

  & > *[data-grid-area='image'] > *:first-child {
    height: 100%;
  }

  @media (min-width: 500px) {
    grid-template-areas: 'image details';
    grid-template-rows: 1fr;
    grid-template-columns: auto 1fr;

    & > *[data-grid-area='image'] > *:first-child {
      height: 15vh;
      width: 15vh;
      margin-bottom: var(--spacing-md);
    }
  }

  & > *:first-child {
    grid-area: image;
  }

  & > *:nth-child(2) {
    grid-area: details;
  }
`;

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

export const RecipeSpotlight: FC<SpotlightProps> = ({
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
        {showSave && <RecipeSaveButton recipeId={recipe.id} />}
      </Box>
      <Box data-grid-area="details">
        {linkTitle ? (
          <Link to={!!recipe.id && `/recipes/${recipe.id}`}>
            <Typography component="h1" variant="h2" gutterBottom>
              {recipe.title}
            </Typography>
          </Link>
        ) : (
          <Typography component="h1" variant="h2" gutterBottom>
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

export const RecipeSpotlightSkeleton = () => (
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
