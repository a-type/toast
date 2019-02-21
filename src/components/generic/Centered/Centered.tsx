import styled from 'styled-components';

export default styled<
  { direction?: string; style?: React.CSSProperties },
  'div'
>('div')`
  display: flex;
  flex-direction: ${props => props.direction || 'column'};

  & > * {
    margin: auto;
  }
`;
