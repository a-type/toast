export interface LayoutContext {
  secondaryContentHidden: boolean;
  hasSecondaryContent: boolean;
  secondaryContentIcon: string;
  isNarrow: boolean;
  toggleSecondaryContent(): void;
}

export enum BackgroundStyle {
  Blank,
  Brand,
  Art,
}
