import React from 'react';
import Recipe from 'components/recipes/View';

export default ({ match: { params } }) => <Recipe recipeId={params.recipeId} />;
