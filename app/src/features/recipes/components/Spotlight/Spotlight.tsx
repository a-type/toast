import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'components/text';
import SaveButton from 'features/recipes/SaveButton/SaveButton';
import { Image, Layout } from './components';
import { path } from 'ramda';
import { Heading, Paragraph } from 'grommet';
import { HeadingSkeleton, ParagraphSkeleton } from 'components/skeletons';
import { Icon } from 'components/generic';

const truncate = (text: string, characters: number = 180) => {
  let trimmed = text.substr(0, characters);
  trimmed = trimmed.substr(
    0,
    Math.min(trimmed.length, trimmed.lastIndexOf(' ')),
  );
  if (trimmed.length < text.length) {
    trimmed += '...';
  }
  return trimmed;
};

const Spotlight = ({ recipe }) => {
  if (!recipe) {
    return null;
  }

  const coverImage = path<string>(['coverImage', 'url'], recipe);

  return (
    <Layout>
      <Image src={coverImage} data-grid-area="image">
        {!coverImage && <Icon name="chef-toque" size="100px" />}
      </Image>
      <div data-grid-area="details">
        <Link to={`/recipes/${recipe.id}`}>
          <Heading margin={{ bottom: 'small', top: '0' }}>
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
        <SaveButton id={recipe.id} />
      </div>
    </Layout>
  );
};

Spotlight.Skeleton = () => (
  <Layout>
    <Image data-grid-area="image" />
    <div data-grid-area="details">
      <HeadingSkeleton />
      <ParagraphSkeleton />
    </div>
  </Layout>
);

Spotlight.fragments = {
  recipe: gql`
    fragment RecipeSpotlight on Recipe {
      description
      attribution
      sourceUrl
      author {
        id
        displayName
      }
      coverImage {
        id
        url
      }
    }
  `,
};

export default Spotlight;