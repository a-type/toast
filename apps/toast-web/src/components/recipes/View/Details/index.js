// @flow
import React from 'react';
import Layout from './Layout';
import H1 from 'components/generic/H1';
import Link from 'components/generic/Link';
import { type Recipe } from 'types';

export default ({ recipe }: { recipe: Recipe }) => {
  if (!recipe) {
    return null;
  }

  const { author, description, title } = recipe;

  return (
    <Layout>
      <H1>{title}</H1>
      <span>
        by{' '}
        <Link to={`/authors/${author.id}`}>{author.name || 'Anonymous'}</Link>
      </span>
      <p>{description || 'No description'}</p>
    </Layout>
  );
};
