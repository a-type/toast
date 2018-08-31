import React from 'react';
import { CardContainer } from './Card';
import styled from 'styled-components';

const Container = styled(CardContainer)`
  height: 77px;
`;

export default props => <Container {...props} />;
