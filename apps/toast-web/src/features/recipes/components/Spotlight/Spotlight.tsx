import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'components/text';
import LikeButton from 'features/recipes/LikeButton';
import { Image, Layout } from './components';
import { path } from 'ramda';
import { Heading, Paragraph } from 'grommet';
import { HeadingSkeleton, ParagraphSkeleton } from 'components/skeletons';

const Spotlight = ({ recipe }) => {
  return recipe ? (
    <Layout>
      <Image src={path(['coverImage', 'url'], recipe)} data-grid-area="image" />
      <div data-grid-area="details">
        <Link to={`/recipes/${recipe.id}`}>
          <Heading>{recipe.title}</Heading>
        </Link>
        {recipe.description && <Paragraph>{recipe.description}</Paragraph>}
        {recipe.attribution && (
          <Link to={recipe.sourceUrl} newTab>
            from {recipe.attribution}
          </Link>
        )}
        <LikeButton recipe={recipe} />
      </div>
    </Layout>
  ) : null;
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
      ...LikeButton
    }
    ${LikeButton.fragments.recipe}
  `,
};

export default Spotlight;
