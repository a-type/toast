import React from 'react';
import Editor from 'components/recipes/Editor';

export default ({ match: { params } }) => <Editor recipeId={params.recipeId} />;
