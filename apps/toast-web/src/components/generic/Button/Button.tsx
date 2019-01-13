import * as React from 'react';
import styled, { StyledComponentClass } from 'styled-components';
import Icon, { IconName } from '../Icon';
import { focusShadow } from 'components/effects';
import { Size, getSize } from 'theme';

export type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  spaceBelow?: Size;
  type?: string;
  disabled?: boolean;
};
export type IconButtonProps = ButtonProps & {
  name: IconName;
  iconProps?: {};
  as?: StyledComponentClass<ButtonProps, {}>;
  ref?: React.Ref<HTMLButtonElement>;
};

interface ButtonWithVariants
  extends StyledComponentClass<ButtonProps, 'button'> {
  Positive?: StyledComponentClass<ButtonProps, {}>;
  PositiveLight?: StyledComponentClass<ButtonProps, {}>;
  Negative?: StyledComponentClass<ButtonProps, {}>;
  NegativeLight?: StyledComponentClass<ButtonProps, {}>;
  Ghost?: StyledComponentClass<ButtonProps, {}>;
  Icon?: React.ComponentType<IconButtonProps>;
  Group?: StyledComponentClass<{}, {}>;
}

const Button: ButtonWithVariants = styled<ButtonProps, 'button'>('button')`
  border: 2px solid var(--color-control-background);
  color: var(--color-control-foreground);
  cursor: pointer;
  background: var(--color-control-background);
  font-family: var(--font-default);
  font-style: italic;
  font-size: var(--font-size-md);
  border-radius: var(--border-radius-md);
  transition: 0.25s ease-in-out;
  display: inline-block;
  position: relative;
  margin-bottom: ${props => getSize(props.spaceBelow) || 'auto'};

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    outline: none;
    box-shadow: ${focusShadow.default};
    z-index: 1;
  }

  &:active {
    outline: none;
    border-color: var(--color-control-background-active);
    background: var(--color-control-background-active);
    color: var(--color-control-foreground-active);
    box-shadow: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
    border-style: dotted;
    border-color: var(--color-gray-light);
    background: var(--color-gray-lightest);
    color: var(--color-gray);
  }

  padding: 5px 11px;

  & + & {
    margin-left: var(--spacing-md);
  }
`;

Button.Positive = styled(Button)`
  --color-control-background: var(--color-positive);
  --color-control-foreground: var(--color-white);
  --color-control-background-active: var(--color-positive-light);
  --color-control-foreground-active: var(--color-white);

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    box-shadow: ${focusShadow('positive-light')};
  }
`;

Button.PositiveLight = styled(Button)`
  --color-control-background: var(--color-positive-light);
  --color-control-foreground: var(--color-positive);
  --color-control-background-active: var(--color-positive);
  --color-control-foreground-active: var(--color-white);

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    box-shadow: ${focusShadow('positive')};
  }
`;

Button.Negative = styled(Button)`
  --color-control-background: var(--color-negative);
  --color-control-foreground: var(--color-white);
  --color-control-background-active: var(--color-negative-light);
  --color-control-foreground-active: var(--color-white);

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    box-shadow: ${focusShadow('negative-light')};
  }
`;

Button.NegativeLight = styled(Button)`
  --color-control-background: var(--color-negative-light);
  --color-control-foreground: var(--color-negative);
  --color-control-background-active: var(--color-negative);
  --color-control-foreground-active: var(--color-white);

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    box-shadow: ${focusShadow('negative')};
  }
`;

Button.Ghost = styled(Button)`
  background: transparent;
  border-color: var(--color-control-background);
  color: var(--color-control-foreground);

  &:active {
    border-color: var(--color-background-active);
    border-style: solid;
    background: transparent;
  }

  &:hover,
  &:focus {
    background: var(--color-control-background);
    border-color: var(--color-control-background);
    color: var(--color-dark);
    border-style: solid;
  }
`;

const ClearIconButton = styled(Button)`
  background: transparent;
  border-color: transparent;
  padding: 0;
  width: 38px;
  height: 38px;
  border-radius: 100%;
  font-size: 20px;
  color: var(--color-gray);

  &:hover {
    background-color: var(--color-brand-light);
    border-color: var(--color-brand-light);
  }

  &:focus {
    background-color: var(--color-brand-light);
    border-color: var(--color-brand-light);
  }

  &:active {
    background-color: var(--color-brand);
    border-color: var(--color-brand);
  }

  .link-matching > & {
    background-color: var(--color-brand);
    border-color: var(--color-brand);
    color: var(--color-white);
  }
`;

Button.Icon = React.forwardRef(
  (
    {
      name,
      iconProps,
      as: asProp,
      spaceBelow = 'auto',
      ...others
    }: IconButtonProps,
    ref,
  ) => {
    const IconButton = asProp || ClearIconButton;
    return (
      <IconButton {...others} spaceBelow={spaceBelow} ref={ref as any}>
        <Icon name={name} {...iconProps} />
      </IconButton>
    );
  },
);

Button.Group = styled.div`
  display: flex;
  flex-direction: row;

  & > button {
    margin: 0;
    flex: 1;
  }

  & > button:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  & > button + button {
    margin-left: 0 !important;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

export default Button;
