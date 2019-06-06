import React, { FC } from 'react';
import gql from 'graphql-tag';
import { Link } from 'components/text';
import SaveButton from 'features/recipes/SaveButton/SaveButton';
import { Image, Layout } from './components';
import { path } from 'ramda';
import { Paragraph, Box } from 'grommet';
import { Heading } from 'components/text';
import { HeadingSkeleton, ParagraphSkeleton } from 'components/skeletons';
import { Icon } from 'components/generic';

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
  recipe: {
    coverImageUrl?: string;
    id?: string;
    sourceUrl?: string;
    title: string;
    description: string;
    attribution?: string;
  };
}

export const Spotlight: FC<SpotlightProps> = ({ recipe, showSave }) => {
  if (!recipe) {
    return null;
  }

  const coverImage = path<string>(['coverImageUrl'], recipe);

  return (
    <Layout>
      <Box data-grid-area="image">
        <Image src={coverImage}>
          {!coverImage && <Icon name="local_dining" size="100px" />}
        </Image>
        {showSave && <SaveButton id={recipe.id} />}
      </Box>
      <Box data-grid-area="details">
        <Link to={!!recipe.id && `/recipes/${recipe.id}`}>
          <Heading
            level="1"
            css={{ marginBottom: 'var(--spacing-small)', marginTop: '0' }}
          >
            {recipe.title}
          </Heading>
        </Link>
        {recipe.description && (
          <Paragraph>{truncate(recipe.description)}</Paragraph>
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
