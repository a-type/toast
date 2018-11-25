export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  loading?: boolean;
  focused?: boolean;
  invalid?: boolean;
  value?: string;
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
  name?: string;
  type?: string;
  max?: number;
  min?: number;
  size?: number;
}
