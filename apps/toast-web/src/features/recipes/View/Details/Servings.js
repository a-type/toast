import React from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { P } from 'components/typeset';
import { Input, Icon } from 'components/generic';

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
        <P>
          <span>Servings: </span>
          <Mutation mutation={SetPreferredServings}>
            {mutate => {
              const setServings = val =>
                mutate({ variables: { servings: val ? parseInt(val) : '' } });

              return (
                <Input.Group
                  value={displayServings}
                  onChange={ev => setServings(ev.target.value)}
                  name="preferredServings"
                  type="number"
                  max={99}
                  min={0}
                  size={2}
                >
                  {displayServings !== servings && (
                    <Input.Group.Button onClick={() => setServings(servings)}>
                      <Icon name="delete" />
                    </Input.Group.Button>
                  )}
                </Input.Group>
              );
            }}
          </Mutation>
        </P>
      );
    }}
  </Query>
);
