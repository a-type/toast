export interface LayoutContext {
  secondaryContentHidden: boolean;
  hasSecondaryContent: boolean;
  secondaryContentIcon: string;
  hasControls: boolean;
  isNarrow: boolean;
  toggleSecondaryContent(): void;
  registerControl(controlName: string, present: boolean): void;
  controlsElement: HTMLElement;
}

export enum BackgroundStyle {
  Blank,
  Brand,
  Art,
}
