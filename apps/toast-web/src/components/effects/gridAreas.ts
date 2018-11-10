import { css } from 'styled-components';

export default (areaNames: string[]) =>
  areaNames.map(
    areaName => css`
      & > *[data-grid-area="${areaName}"] {
        grid-area: ${areaName};
      }
    `,
  );
