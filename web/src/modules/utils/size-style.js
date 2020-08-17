import hasUnits from './has-units';
import getCssVar from './get-css-var';

// Set size if providen. If size has units, use css var --step
// otherwise use it as multiple of defined default size increment.
export default function sizeStyle(
  sizeProp,
  { defaultValue = 8, width = true, height = true } = {}
) {
  let sizeStr;
  if (![null, undefined].includes(sizeProp)) {
    if (hasUnits(sizeProp)) {
      sizeStr = sizeProp;
    } else {
      const step = getCssVar('--step', defaultValue);
      const size = sizeProp * step;
      sizeStr = size + 'px';
    }
  }
  if (!sizeStr) return {};
  const style = {};
  if (width) {
    style.width = sizeStr;
    style['min-width'] = sizeStr;
  }
  if (height) {
    style.height = sizeStr;
    style['min-height'] = sizeStr;
  }
  return style;
}
