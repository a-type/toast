import { useState, useCallback, useRef, useMemo } from 'react';
import { PopperProps } from '@material-ui/core/Popper';
import { useLazyFoodSuggestions } from 'hooks/features/useLazyFoodSuggestions';
import { Value, Editor } from 'slate';
import { Plugin } from 'slate-react';

const UP_ARROW_KEY = 38;
const DOWN_ARROW_KEY = 40;
const ENTER_KEY = 13;
const ESCAPE_KEY = 27;
const TAB_KEY = 9;

export const useFoodSuggestionsPlugin = (): [
  Plugin,
  {
    popperAnchor: PopperProps['anchorEl'];
    suggestions: { id: string; name: string }[];
    loading: boolean;
    highlightedSuggestion: number;
    showSuggestions: boolean;
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
  const [highlightedSuggestion, setHighlightedSuggestion] = useState<number>(0);
  const [trackedValue, setTrackedValue] = useState('');

  const onKeyDown = useCallback(
    (event: KeyboardEvent, editor: Editor, next) => {
      const keyCode = event.keyCode;

      const isSuggestionsOpen = menuState === 'capturing';

      if (
        isSuggestionsOpen &&
        (keyCode === UP_ARROW_KEY || keyCode === DOWN_ARROW_KEY)
      ) {
        event.preventDefault();
        if (keyCode === UP_ARROW_KEY) {
          setHighlightedSuggestion(
            (suggestions.length + highlightedSuggestion - 1) %
              suggestions.length,
          );
        } else {
          setHighlightedSuggestion(
            (highlightedSuggestion + 1) % suggestions.length,
          );
        }
      }

      if (isSuggestionsOpen && (keyCode === ENTER_KEY || keyCode === TAB_KEY)) {
        event.preventDefault();
        editor
          .deleteBackward(trackedValue.length)
          .insertText(suggestions[highlightedSuggestion].name);
        setHighlightedSuggestion(null);
        setMenuState('dismissed');
        return;
      }

      if (isSuggestionsOpen && keyCode === ESCAPE_KEY) {
        event.preventDefault();
        setMenuState('dismissed');
        setHighlightedSuggestion(null);
      }

      next();
    },
    [
      menuState,
      setMenuState,
      suggestions,
      highlightedSuggestion,
      setHighlightedSuggestion,
      trackedValue,
    ],
  );

  const onChange = useCallback(
    (change: { value: Value }) => {
      const newTrackedValue = getTrackedValue(change.value) || '';

      if (newTrackedValue !== trackedValue) {
        setTrackedValue(newTrackedValue);

        if (newTrackedValue.length === 0) {
          setMenuState('capturing');
        }

        if (menuState === 'dismissed') {
          return;
        }

        if (newTrackedValue.length < 3) {
          return;
        }

        handleSearchTermChange(newTrackedValue);

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
            Math.max(0, clonedRange.startOffset - newTrackedValue.length),
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
    [
      handleSearchTermChange,
      trackedValue,
      menuState,
      setMenuState,
      setTrackedValue,
    ],
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
      popperAnchor: popperAnchorRef.current,
      showSuggestions:
        trackedValue.length > 2 &&
        menuState === 'capturing' &&
        suggestions.length > 0,
      highlightedSuggestion,
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
