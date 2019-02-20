import React from 'react';
import Layout from './Layout';
import Servings from './Servings';
import gql from 'graphql-tag';
import Time from './Time';
import { Link } from 'components/text';

const RecipeDetails = ({ recipe }) => {
  if (!recipe) {
    return null;
  }

  const { servings, cookTime, prepTime, unattendedTime, sourceUrl } = recipe;

  return (
    <Layout>
      <Link to={sourceUrl}>{sourceUrl}</Link>
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
    }
  `,
};

export default RecipeDetails;
