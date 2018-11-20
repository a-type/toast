import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'components/typeset';
import { H1, P, Span, H2, Aside } from 'components/typeset';
import { LikeButton } from 'features/recipes';
import { Image, Layout } from './components';
import { path } from 'ramda';

const Spotlight = ({ recipe }) =>
  recipe ? (
    <Layout>
      <Image src={path(['coverImage', 'src'], recipe)} data-grid-area="image" />
      <div data-grid-area="details">
        <H2 spaceBelow="lg">Featured Recipe</H2>
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
      <H2 spaceBelow="lg">Featured Recipe</H2>
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
