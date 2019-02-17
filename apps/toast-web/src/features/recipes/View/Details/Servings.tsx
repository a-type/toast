import React from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Icon } from 'components/generic';
import { Box, Button, TextInput, Paragraph } from 'grommet';

const GetPreferredServings = gql`
  query GetPreferredServings {
    preferredServings @client
  }
`;

const SetPreferredServings = gql`
  mutation SetPreferredServings($servings: Int!) {
    setPreferredServings(servings: $servings) @client
  }
`;

export default ({ servings }) => (
  <Query query={GetPreferredServings}>
    {({ data, error, loading }) => {
      if (data.preferredServings === undefined) {
        return null;
      }

      const displayServings =
        data.preferredServings === null ? servings : data.preferredServings;

      return (
        <Paragraph>
          <span>Servings: </span>
          <Mutation mutation={SetPreferredServings}>
            {mutate => {
              const setServings = val =>
                mutate({ variables: { servings: val ? parseInt(val) : '' } });

              return (
                <Box direction="row">
                  <TextInput
                    value={displayServings}
                    onChange={ev => setServings(ev.target.value)}
                    name="preferredServings"
                    type="number"
                    max={99}
                    min={0}
                  />
                  {displayServings !== servings && (
                    <Button
                      onClick={() => setServings(servings)}
                      icon={<Icon name="delete-button" />}
                    />
                  )}
                </Box>
              );
            }}
          </Mutation>
        </Paragraph>
      );
    }}
  </Query>
);
