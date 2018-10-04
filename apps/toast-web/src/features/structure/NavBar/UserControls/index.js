import React from 'react';
import ProfileButton from './ProfileButton';
import PlanButton from './PlanButton';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  flex-direction: row;

  & > * {
    margin-top: auto;
    margin-bottom: auto;
  }

  & > *:not(:first-child) {
    margin-left: var(--spacing-md);
  }
`;

export default () => (
  <Row>
    <PlanButton />
    <ProfileButton />
  </Row>
);
