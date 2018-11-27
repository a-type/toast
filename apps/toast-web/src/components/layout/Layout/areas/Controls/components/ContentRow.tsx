import styled from 'styled-components';

export interface ContentRowProps {
  hasControls: boolean;
}

const ContentRow = styled<ContentRowProps, 'div'>('div')`
  display: flex;
  flex-direction: row;
  color: var(--color-dark);
  padding: 0 ${props => (props.hasControls ? 'var(--spacing-md)' : '0')};

  & > * {
    margin-top: auto;
    margin-bottom: auto;
    margin-right: auto;
  }

  & > * + * {
    margin-left: var(--spacing-md);
  }
`;

export default ContentRow;
