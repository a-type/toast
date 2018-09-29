import React from 'react';
import gql from 'fraql';
import { Link } from 'components/typeset';
import { H1, P, Span, H2, Aside } from 'components/typeset';
import { LikeButton } from 'features/recipes';

const Spotlight = ({ recipe }) =>
  recipe ? (
    <div>
      <H2 spaceBelow="lg">Featured Recipe</H2>
      <Link to={`/recipes/${recipe.id}`}>
        <H1>{recipe.title}</H1>
      </Link>
      {recipe.description && <P>{recipe.description}</P>}
      {recipe.attribution && <Aside>from {recipe.attribution}</Aside>}
      <LikeButton recipe={recipe} />
    </div>
  ) : null;

Spotlight.Skeleton = () => (
  <div>
    <H2 spaceBelow="lg">Featured Recipe</H2>
    <H1>
      <Span.Skeleton />
    </H1>
    <P.Skeleton />
  </div>
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
      ${LikeButton.fragments.recipe}
    }
  `,
};

export default Spotlight;
