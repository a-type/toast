const focusShadow = color => `0 0 0 4px var(--color-${color})`;
focusShadow.default = focusShadow('brand-light');

export default focusShadow;
