import * as React from 'react';

export type Range = {
  name: string;
  start: number;
  end: number;
  render: (text: string) => React.ReactNode;
};

export interface RangeHighlighterProps {
  text: string;
  ranges: Range[];
}

const reverseByStart = (a: Range, b: Range) => b.start - a.start;

const RangeHighlighter: React.SFC<RangeHighlighterProps> = ({
  text,
  ranges,
}) => {
  const segments: React.ReactNode[] = ranges
    .sort(reverseByStart)
    .reduce(
      (segs, range) => {
        if (range.end - range.start > 0) {
          return [
            segs[0].slice(0, range.start),
            range.render(text.slice(range.start, range.end)),
            segs[0].slice(range.end),
            ...segs.slice(1),
          ];
        }
        return segs;
      },
      [text],
    )
    .map(item => {
      if (typeof item === 'string' && item) {
        return <span key={item}>{item}</span>;
      }
      return item;
    });

  return <div>{segments}</div>;
};

export default RangeHighlighter;
