// @flow
import React from 'react';
import Layout from './Layout';
import { P, Link } from 'components/typeset';
import { type Recipe } from 'types';
import Servings from './Servings';

export default ({ recipe }: { recipe: Recipe }) => {
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
    </Layout>
  );
};
