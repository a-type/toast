import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'components/typeset';
import { H1, P, Span, Aside } from 'components/typeset';
import LikeButton from 'features/recipes/LikeButton';
import { Image, Layout } from './components';
import { path } from 'ramda';

const Spotlight = ({ recipe }) =>
  recipe ? (
    <Layout>
      <Image src={path(['coverImage', 'url'], recipe)} data-grid-area="image" />
      <div data-grid-area="details">
        <Link to={`/recipes/${recipe.id}`}>
          <H1>{recipe.title}</H1>
        </Link>
        {recipe.description && <P>{recipe.description}</P>}
        {recipe.attribution && <Aside>from {recipe.attribution}</Aside>}
        <LikeButton recipe={recipe} />
      </div>
    </Layout>
  ) : null;

Spotlight.Skeleton = () => (
  <Layout>
    <Image data-grid-area="image" />
    <div data-grid-area="details">
      <H1>
        <Span.Skeleton />
      </H1>
      <P.Skeleton />
    </div>
  </Layout>
);

Spotlight.fragments = {
  recipe: gql`
    fragment RecipeSpotlight on Recipe {
      description
      attribution
      author {
        id
        name
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
