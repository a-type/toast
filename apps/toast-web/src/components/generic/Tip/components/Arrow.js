import styled from 'styled-components';

export default styled.div`
  position: absolute;
  width: 12px;
  height: 12px;

  &::after {
    content: '';
    margin: auto;
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
  }

  [data-placement*='bottom'] > & {
    top: 0;
    left: 0;
    margin-top: -4px;
    width: 12px;
    height: 8px;
    &::after {
      border-width: 0 6px 4px 6px;
      border-color: transparent transparent var(--color-white) transparent;
    }
  }

  [data-placement*='top'] > & {
    bottom: 0;
    left: 0;
    margin-bottom: -8px;
    width: 12px;
    height: 8px;
    &::after {
      border-width: 4px 6px 0px 6px;
      border-color: var(--color-white) transparent transparent;
    }
  }

  [data-placement*='right'] > & {
    left: 0;
    margin-left: -8px;
    width: 8px;
    height: 12px;
    &::after {
      border-width: 6px 4px 6px 0;
      border-color: transparent var(--color-white) transparent transparent;
    }
  }

  [data-placement*='left'] > & {
    right: 0;
    margin-right: -8px;
    height: 12px;
    width: 8px;
    &::after {
      border-width: 6px 0 6px 4px;
      border-color: transparent transparent transparent var(--color-white);
    }
  }
`;
