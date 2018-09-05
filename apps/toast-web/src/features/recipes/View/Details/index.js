// @flow
import React from 'react';
import Layout from './Layout';
import { P, Link } from 'components/typeset';
import { type Recipe } from 'types';
import Servings from './Servings';
import gql from 'graphql-tag';
import Time from './Time';

const RecipeDetails = ({ recipe }: { recipe: Recipe }) => {
  if (!recipe) {
    return null;
  }

  const {
    author,
    attribution,
    sourceUrl,
    description,
    title,
    servings,
    cookTime,
    prepTime,
    unattendedTime,
  } = recipe;

  return (
    <Layout>
      {author && (
        <P>
          by{' '}
          <Link to={`/users/${author.id}`}>{author.name || 'Anonymous'}</Link>
        </P>
      )}
      {attribution && (
        <P>
          from <Link to={sourceUrl}>{attribution}</Link>
        </P>
      )}
      {description && <P>{description}</P>}
      <Servings servings={servings} />
      <Time
        cookTime={cookTime}
        prepTime={prepTime}
        unattendedTime={unattendedTime}
      />
    </Layout>
  );
};

RecipeDetails.fragments = {
  Recipe: gql`
    fragment RecipeDetails on Recipe {
      id
      title
      description
      attribution
      sourceUrl
      servings
      cookTime
      prepTime
      unattendedTime

      author {
        id
        name
      }
    }
  `,
};

export default RecipeDetails;
