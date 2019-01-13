import React from 'react';
import PropTypes from 'prop-types';
import { Manager, Reference, Popper } from 'react-popper';
import styled from 'styled-components';

const Container = styled.div`
  background-color: var(--color-gray-lightest);
  overflow-y: auto;
  border-radius: 6px;
  box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.15);
  z-index: 100000;

  &[data-placement*='top'] {
    margin-bottom: 6px;
  }
  &[data-placement*='bottom'] {
    margin-top: 6px;
  }
`;

export default ({ children, dockedContent }) => (
  <Manager>
    <Reference>{children}</Reference>
    <Popper
      placement="bottom"
      positionFixed
      modifiers={{
        autoSize: {
          enabled: true,
          order: 840,
          fn: data => {
            data.offsets.popper.left = data.offsets.reference.left;
            data.offsets.popper.right = data.offsets.popper.right;
            data.styles.width = data.offsets.popper.width =
              data.offsets.reference.width;
            return data;
          },
        },
      }}
    >
      {({ ref, style, placement }) => (
        <Container ref={ref} style={style} data-placement={placement}>
          {dockedContent}
        </Container>
      )}
    </Popper>
  </Manager>
);
