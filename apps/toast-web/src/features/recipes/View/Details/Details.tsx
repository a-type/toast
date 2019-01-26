import React from 'react';
import Layout from './Layout';
import Servings from './Servings';
import gql from 'graphql-tag';
import Time from './Time';

const RecipeDetails = ({ recipe }) => {
  if (!recipe) {
    return null;
  }

  const { servings, cookTime, prepTime, unattendedTime } = recipe;

  return (
    <Layout>
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
