import isClient from './is-client';

// Set size if providen. If size has units, use css var --step
// otherwise use it as multiple of defined default size increment.
export default function getCssVar(name, defaultValue) {
  let cssVar = defaultValue; // default
  if (isClient) {
    const style = getComputedStyle(document.documentElement);
    const cssVarStr = style.getPropertyValue('--step');
    if (cssVarStr) cssVar = parseFloat(cssVarStr);
  }
  return cssVar;
}
