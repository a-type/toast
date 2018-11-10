import React from 'react';
import styled, { StyledComponentClass } from 'styled-components';
import Input from './Input';
import Button from '../Button';
import { focusShadow } from 'components/effects';

const Container = styled<{ hasChildren: boolean }, 'div'>('div')`
  display: inline-flex;
  flex-direction: column;

  & > * {
    flex: 0 0 auto;
  }
  & > ${Input} {
    flex: 1;
    position: relative;
    z-index: 1;
    ${props =>
      props.hasChildren
        ? `border-radius: var(--border-radius-md) var(--border-radius-md) 0 0`
        : ''};
  }

  @media (min-width: 700px) {
    flex-direction: row;

    & > ${Input} {
      flex: 1;
      ${props =>
        props.hasChildren
          ? `border-radius: var(--border-radius-md) 0 0 var(--border-radius-md);`
          : ''};
    }
  }
`;

const GroupedContent = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  z-index: 0;
  transition: 0.2s ease all;
  border-radius: 0 0 var(--border-radius-md) var(--border-radius-md);
  align-self: flex-start;

  &:hover {
    z-index: 1;
  }

  & > *:first-child {
    border-radius: 0 0 0 var(--border-radius-md);
  }

  & > *:last-child {
    border-radius: 0 0 var(--border-radius-md) 0;
  }

  ${Input}:focus + & {
    box-shadow: ${focusShadow('brand')};
  }

  @media (min-width: 700px) {
    align-self: stretch;
    border-radius: 0 var(--border-radius-md) var(--border-radius-md) 0;

    & > *:first-child {
      border-radius: 0;
    }

    & > *:last-child {
      border-radius: 0 var(--border-radius-md) var(--border-radius-md) 0;
    }
  }
`;

interface GroupButtonWithVariants
  extends StyledComponentClass<{}, typeof Button> {
  Negative?: React.SFC<{}>;
  Positive?: React.SFC<{}>;
}

const ModifiedButton: GroupButtonWithVariants = styled(Button)`
  border-radius: 0;
  margin: 0 !important;
`;
ModifiedButton.Negative = props => (
  <ModifiedButton as={Button.Negative} {...props} />
);
ModifiedButton.Positive = props => (
  <ModifiedButton as={Button.Positive} {...props} />
);

const InputGroup = ({ children, groupProps, ...inputProps }) => (
  <Container hasChildren={!!children} {...groupProps}>
    <Input {...inputProps} />
    {children && <GroupedContent>{children}</GroupedContent>}
  </Container>
);

InputGroup.Button = ModifiedButton;

export default InputGroup;
