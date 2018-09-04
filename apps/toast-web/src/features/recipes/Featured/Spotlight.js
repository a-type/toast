import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'components/typeset';
import { H1, P, Span, H2 } from 'components/typeset';

const Spotlight = ({ recipe }) =>
  recipe ? (
    <Link.Clear to={`/recipes/${recipe.id}`}>
      <div>
        <H2 spaceBelow="lg">Featured Recipe</H2>
        <H1>{recipe.title}</H1>
        <P>{recipe.description}</P>
      </div>
    </Link.Clear>
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
  Recipe: gql`
    fragment RecipeSpotlight on Recipe {
      description
      author {
        id
        name
      }
    }
  `,
};

export default Spotlight;
