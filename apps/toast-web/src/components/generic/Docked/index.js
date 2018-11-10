import React from 'react';
import PropTypes from 'prop-types';
import Portal from './Portal';
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

// /**
//  * The Docked component renders an absolutely-positioned 'docked'
//  * overlay anchored against a target element. It was designed to
//  * render 'dropdown' style lists for search/select inputs. It uses
//  * React portals to render the overlay element in relation to the
//  * screen-space position of the anchor element. Supports polling
//  * for position changes in more advanced cases where layout is not
//  * reliably static.
//  */
// class Docked extends React.Component {
//   static propTypes = {
//     /**
//      * Attachment indicates whether the docked element should orient
//      * itself above or below the target element.
//      */
//     attachment: PropTypes.oneOf(['above', 'below']),
//     /**
//      * Set to true and the docked element may change its attachment
//      * based on the available space on the screen (unless polling is
//      * enabled, this calculation will only be made once during render)
//      */
//     isAttachmentDynamic: PropTypes.bool,
//     /**
//      * Specify a maximum height for the overlay content. Overflow
//      * will scroll vertically. Used to calculate dynamic attachment.
//      */
//     maxHeight: PropTypes.number,
//     /**
//      * A number of pixels to 'buffer' between the docked element and the edge
//      * of the screen. If the buffer cannot be fit between the element and the
//      * screen edge on render and isAttachmentDynamic is true, the attachment
//      * will be switched.
//      */
//     buffer: PropTypes.number,
//     /**
//      * A 'render prop' which is passed a set of helpers: { anchorRef, renderDocked }
//      * `anchorRef` must be attached to the element you want to anchor to
//      * `renderDocked` must wrap any rendering of the docked element.
//      */
//     children: PropTypes.func.isRequired,
//     /**
//      * A selector which should match an element currently on the page which
//      * serves as the closest 'context' parent of the anchor element.
//      * This element MUST have a `relative`, `absolute`, or `fixed` CSS position.
//      */
//     scrollContextSelector: PropTypes.string,
//     /**
//      * Controls whether the docked element is visible. This is true by
//      * default. If you provide this prop, you can control the visibility.
//      * When this prop goes from `false` to `true`, position and sizes
//      * will be recalculated.
//      */
//     isDockedVisible: PropTypes.bool,
//     /**
//      * Computes the style values which will be passed to the root docked
//      * element. The function is called with many provided values for you
//      * to use: ({ anchorWidth, availableHeight, anchorPoint, attachment, dockedProps }).
//      * - anchorWidth: the pixel width of the anchor element
//      * - availableHeight: available screen space which the docked element can consume before reaching the screen border
//      * - anchorPoint: { top, left } of the point on the anchor element which the docked element is attached to
//      * - attachment: the current attachment ('above' / 'below') value
//      * - dockedProps: the props passed to this component to use as you like
//      */
//     calcDockedStyles: PropTypes.func,
//     /**
//      * Can be used to override some global environmental variables like
//      * the window reference.
//      */
//     environment: PropTypes.shape({
//       window: PropTypes.instanceOf(Window),
//     }),
//   };

//   static defaultProps = {
//     attachment: 'below',
//     isAttachmentDynamic: true,
//     maxHeight: 800,
//     buffer: 20,
//     isDockedVisible: true,
//     scrollContextSelector: 'body',
//     calcDockedStyles: defaultCalcDockedStyles,
//     environment: { window },
//   };

//   state = {
//     anchorElement: null,
//     contextElement: null,
//     anchorPoint: null,
//     currentAttachment: this.props.attachment,
//     width: 0,
//     height: this.props.maxHeight,
//   };

//   handleResize = entries => {
//     for (let entry of entries) {
//       this.updatePlacement(this.state.anchorElement, this.state.contextElement);
//     }
//   };
//   resizeObserver = new window.ResizeObserver(this.handleResize);

//   componentWillReceiveProps(newProps) {
//     if (!this.props.isDockedVisible && newProps.isDockedVisible) {
//       this.updatePlacement(this.state.anchorElement, this.state.contextElement);
//     }
//   }

//   componentDidMount() {
//     this.resizeObserver.observe(document.body);
//   }

//   componentWillUnmount() {
//     if (this.state.anchorElement) {
//       this.resizeObserver.unobserve(this.state.anchorElement);
//     }
//   }

//   onAnchorRef = el => {
//     const {
//       environment,
//       scrollContextSelector,
//       pollForPositionChanges,
//       pollingInterval,
//     } = this.props;

//     const contextElement =
//       environment.window.document.querySelector(scrollContextSelector) ||
//       environment.window.document.body;

//     // unobserve old anchorElement
//     if (this.state.anchorElement) {
//       this.resizeObserver.unobserve(this.state.anchorElement);
//     }
//     if (el) {
//       this.resizeObserver.observe(el);
//     }

//     this.setState({ anchorElement: el, contextElement });

//     this.updatePlacement(el, contextElement);
//   };

//   updatePlacement = (anchorElement, contextElement) => {
//     const { attachment, isAttachmentDynamic, maxHeight, buffer } = this.props;
//     if (!anchorElement || !contextElement) {
//       return;
//     }

//     const anchorBounds = anchorElement.getBoundingClientRect();
//     const contextBounds = contextElement.getBoundingClientRect();

//     const anchorTop = anchorBounds.top - contextBounds.top;
//     const anchorLeft = anchorBounds.left - contextBounds.left;

//     const topAnchorPoint = {
//       left: anchorLeft,
//       top: anchorTop,
//     };
//     const bottomAnchorPoint = {
//       left: anchorLeft,
//       top: anchorTop + anchorBounds.height,
//     };

//     const spaceBelow = contextBounds.height - (anchorTop + anchorBounds.height);
//     const spaceAbove = anchorTop;

//     // determine largest logical screen space above or below.
//     // if the space is smaller than the max height, we want to reduce
//     // the height of the overlay to fit inside this available space
//     // while accomodating the buffer.
//     const largestLogicalSpace = Math.max(spaceAbove, spaceBelow);
//     const largestAvailableSpace =
//       largestLogicalSpace <= maxHeight
//         ? largestLogicalSpace - buffer
//         : largestLogicalSpace;
//     const largestSpaceOrMaxHeight = Math.min(largestAvailableSpace, maxHeight);

//     const decidePlacement = () => {
//       switch (attachment) {
//         case 'above':
//           return spaceAbove > maxHeight + buffer ||
//             spaceAbove >= spaceBelow ||
//             !isAttachmentDynamic
//             ? {
//                 currentAttachment: 'above',
//                 anchorPoint: topAnchorPoint,
//               }
//             : {
//                 currentAttachment: 'below',
//                 anchorPoint: bottomAnchorPoint,
//               };
//         default:
//           return spaceBelow > maxHeight + buffer ||
//             spaceBelow >= spaceAbove ||
//             !isAttachmentDynamic
//             ? {
//                 currentAttachment: 'below',
//                 anchorPoint: bottomAnchorPoint,
//               }
//             : {
//                 currentAttachment: 'above',
//                 anchorPoint: topAnchorPoint,
//               };
//       }
//     };

//     const finalPlacementValues = decidePlacement();
//     this.setState({
//       ...finalPlacementValues,
//       width: anchorBounds.width,
//       height: largestSpaceOrMaxHeight,
//     });
//   };

//   getPortalStyle = () => {
//     const { currentAttachment, anchorPoint, width, height } = this.state;

//     if (!anchorPoint) {
//       return { display: 'none' };
//     }

//     return this.props.calcDockedStyles({
//       attachment: currentAttachment,
//       anchorPoint,
//       anchorWidth: width,
//       availableHeight: height,
//       dockedProps: this.props,
//     });
//   };

//   renderDocked = children =>
//     this.state.contextElement &&
//     this.props.isDockedVisible && (
//       <Portal style={this.getPortalStyle()} target={this.state.contextElement}>
//         {children}
//       </Portal>
//     );

//   render() {
//     const provided = {
//       anchorRef: this.onAnchorRef,
//       renderDocked: this.renderDocked,
//     };
//     return this.props.children(provided);
//   }
// }

// export default Docked;
