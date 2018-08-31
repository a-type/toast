// @flow
import React from 'react';
import Layout from './Layout';
import { P, Link } from 'components/typeset';
import { type Recipe } from 'types';

export default ({ recipe }: { recipe: Recipe }) => {
  if (!recipe) {
    return null;
  }

  const { author, attribution, sourceUrl, description, title } = recipe;

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
      <P>{description || 'No description'}</P>
    </Layout>
  );
};
