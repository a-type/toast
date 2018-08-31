import React from 'react';
import Recipe from 'features/recipes/View';

export default ({ match: { params } }) => <Recipe recipeId={params.recipeId} />;
