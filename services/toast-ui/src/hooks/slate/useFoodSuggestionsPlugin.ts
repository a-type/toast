import { useState, useCallback, useRef, useMemo } from 'react';
import { PopperProps } from '@material-ui/core/Popper';
import { useLazyFoodSuggestions } from 'hooks/features/useLazyFoodSuggestions';
import { Value, Editor } from 'slate';
import { Plugin } from 'slate-react';

const UP_ARROW_KEY = 38;
const DOWN_ARROW_KEY = 40;
const ENTER_KEY = 13;
const ESCAPE_KEY = 27;
const RESULT_SIZE = 5;

export const useFoodSuggestionsPlugin = (): [
  Plugin,
  {
    popperAnchor: PopperProps['anchorEl'];
    suggestions: { id: string; name: string }[];
    loading: boolean;
  },
] => {
  const popperAnchorRef = useRef<PopperProps['anchorEl'] | null>(null);
  const [menuState, setMenuState] = useState<'dismissed' | 'capturing'>(
    'capturing',
  );
  const [
    handleSearchTermChange,
    suggestions,
    { loading },
  ] = useLazyFoodSuggestions();

  const onKeyDown = useCallback(
    (event: KeyboardEvent, editor: Editor) => {
      const keyCode = event.keyCode;

      const isSuggestionsOpen = menuState === 'capturing';

      if (
        isSuggestionsOpen &&
        (keyCode === UP_ARROW_KEY || keyCode === DOWN_ARROW_KEY)
      ) {
        event.preventDefault();
      }

      if (isSuggestionsOpen && keyCode === ENTER_KEY) {
        event.preventDefault();
      }

      if (isSuggestionsOpen && keyCode === ESCAPE_KEY) {
        event.preventDefault();
        setMenuState('dismissed');
      }
    },
    [menuState, setMenuState],
  );

  const lastTrackedValueRef = useRef<string | null>(null);
  const onChange = useCallback(
    (change: { value: Value }) => {
      console.log(change.value);

      const trackedValue = getTrackedValue(change.value) || '';

      if (trackedValue !== lastTrackedValueRef.current) {
        lastTrackedValueRef.current = trackedValue;

        if (menuState === 'dismissed') {
          return;
        }

        handleSearchTermChange(trackedValue);

        // get anchor position
        const selection = window.getSelection();

        if (!selection) {
          return;
        }

        // the user is selecting some text specifically
        const hasSelectedRange =
          selection.anchorOffset !== selection.focusOffset;

        if (hasSelectedRange) {
          return;
        }

        const isAtVeryStart =
          selection.anchorOffset === 0 && selection.focusOffset === 0;
        if (isAtVeryStart) {
          return;
        }

        try {
          const clonedRange = selection.getRangeAt(0).cloneRange();
          // modify range to include all of tracked word value
          clonedRange.setStart(
            clonedRange.startContainer,
            Math.max(0, clonedRange.startOffset - trackedValue.length),
          );

          const boundingClientRect = clonedRange.getBoundingClientRect();

          popperAnchorRef.current = {
            clientHeight: boundingClientRect.height,
            clientWidth: boundingClientRect.width,
            getBoundingClientRect: () => boundingClientRect,
          };
        } catch (err) {
          console.warn(err);
        }
      }
    },
    [handleSearchTermChange, lastTrackedValueRef, menuState],
  );

  const plugin = useMemo(
    () => ({
      onKeyDown,
      onChange,
    }),
    [onKeyDown, onChange],
  );

  return [
    plugin,
    {
      suggestions,
      loading,
      popperAnchor: menuState === 'capturing' ? popperAnchorRef.current : null,
    },
  ];
};

const getTrackedValue = (value: Value) => {
  if (!value.startText) {
    return null; // deletion case
  }

  const startOffset = value.selection.start.offset;
  const lastWord = value.startText.text
    .slice(0, startOffset)
    .split(/\s+/)
    .pop();
  return lastWord;
};

// from http://jsfiddle.net/gliheng/vbucs/12/
function cursorPosition(
  parentElement?: HTMLElement,
  offsetx?: number,
  offsety?: number,
) {
  offsetx = offsetx || 0;
  offsety = offsety || 0;

  let nodeLeft = 0;
  let nodeTop = 0;
  if (parentElement) {
    nodeLeft = parentElement.offsetLeft;
    nodeTop = parentElement.offsetTop;
  }

  const pos = { left: 0, top: 0 };

  if ((document as any).selection) {
    const range = (document as any).selection.createRange();
    pos.left = range.offsetLeft + offsetx - nodeLeft;
    pos.top = range.offsetTop + offsety - nodeTop;
  } else if (window.getSelection) {
    const sel = window.getSelection();
    if (sel.rangeCount === 0) return null;
    const range = sel.getRangeAt(0).cloneRange();

    try {
      range.setStart(range.startContainer, range.startOffset - 1);
    } catch (e) {}

    const rect = range.getBoundingClientRect();

    if (range.endOffset === 0 || range.toString() === '') {
      // first char of line
      if (range.startContainer === parentElement) {
        // empty div
        if (range.endOffset === 0) {
          pos.top = 0;
          pos.left = 0;
        } else {
          // firefox need this
          const range2 = range.cloneRange();
          range2.setStart(range2.startContainer, 0);
          const rect2 = range2.getBoundingClientRect();
          pos.left = rect2.left + offsetx - nodeLeft;
          pos.top = rect2.top + rect2.height + offsety - nodeTop;
        }
      } else {
        pos.top = (range.startContainer as HTMLElement).offsetTop;
        pos.left = (range.startContainer as HTMLElement).offsetLeft;
      }
    } else {
      pos.left = rect.left + rect.width + offsetx - nodeLeft;
      pos.top = rect.top + offsety - nodeTop;
    }
  }
  return pos;
}
