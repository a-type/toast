import styled from 'styled-components';
import React from 'react';
import { Button, Link } from 'components/generic';

const NextDay = ({ weekIndex, dayIndex }) => (
  <Link
    to={`/plan/${weekIndex + (dayIndex === 6 ? 1 : 0)}/${
      dayIndex === 6 ? 0 : dayIndex + 1
    }`}
  >
    <Button>Next day</Button>
  </Link>
);

const PreviousDay = ({ weekIndex, dayIndex }) => (
  <Link
    to={`/plan/${weekIndex - (dayIndex === 0 ? 1 : 0)}/${
      dayIndex === 0 ? 6 : dayIndex - 1
    }`}
  >
    <Button>Previous day</Button>
  </Link>
);

const Edit = () => (
  <Link to="/plan/edit">
    <Button.Ghost>Edit your Plan</Button.Ghost>
  </Link>
);

const Layout = styled.div`
  display: grid;
  grid-template-areas: 'previous next' 'edit blank';
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);

  & > *:first-child {
    grid-area: previous;
  }

  & > *:nth-child(2) {
    grid-area: next;
    justify-self: end;
  }

  & > *:nth-child(3) {
    grid-area: edit;
  }
`;

export default props => (
  <Layout>
    <PreviousDay {...props} />
    <NextDay {...props} />
    <Edit />
  </Layout>
);
