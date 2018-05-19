import React from 'react';
import { Query } from 'react-apollo';
import { Basic } from 'queries/Authors';
import H1 from 'components/generic/H1';

const renderSummary = ({ data, loading, error }) => {
  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  const { name, bio } = data.author;

  return (
    <div>
      <H1>{name || 'Anonymous'}</H1>
      <p>{bio || 'No bio'}</p>
    </div>
  );
};

export default ({ authorId }) => (
  <Query query={Basic} variables={{ authorId }}>
    {renderSummary}
  </Query>
);
