import { css } from 'styled-components';

export default (areaNames: string[]) =>
  areaNames.map(
    (areaName, idx) => css`
      & > *:nth-child(${idx + 1}) {
        grid-area: ${areaName};
      }
    `,
  );
