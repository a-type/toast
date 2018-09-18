import React from 'react';
import styled from 'styled-components';
import Input from './Input';
import Button from '../Button';
import { focusShadow } from 'components/effects';

const Container = styled.div`
  display: inline-flex;
  flex-direction: row;

  & > * {
    flex: 0 0 auto;
  }
  & > ${Input} {
    flex: 1;
    position: relative;
    z-index: 1;
    ${props =>
      props.hasChildren
        ? `border-top-right-radius: 0; border-bottom-right-radius: 0;`
        : ''};
  }
`;

const GroupedContent = styled.div`
  display: flex;
  flex-direction: row;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  position: relative;
  z-index: 0;
  transition: 0.2s ease all;

  &:hover {
    z-index: 1;
  }

  & > *:last-child {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  ${Input}:focus + & {
    box-shadow: ${focusShadow('brand')};
  }
`;

const ModifiedButton = styled(Button)`
  border-radius: 0;
  margin: 0 !important;
`;
ModifiedButton.Negative = ModifiedButton.withComponent(Button.Negative);
ModifiedButton.Positive = ModifiedButton.withComponent(Button.Positive);

const InputGroup = ({ children, ...inputProps }) => (
  <Container hasChildren={!!children}>
    <Input {...inputProps} />
    {children && <GroupedContent>{children}</GroupedContent>}
  </Container>
);

InputGroup.Button = ModifiedButton;

export default InputGroup;
