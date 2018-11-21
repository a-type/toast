export type ContentArea = 'main' | 'secondary';

export interface LayoutContext {
  activeContents: Set<ContentArea>;
  setActiveContent(activeContent: ContentArea): void;
}
