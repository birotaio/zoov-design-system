const hasUnitsRegexp = /[0-9]+(em|x|%|px|cm|mm|in|pt|pc|ch|rem|vh|vw|vmin|vmax)/;

export default function hasUnits(entry) {
  return hasUnitsRegexp.test(entry);
}
