/*
 * Custom theme loader that transform stylus $colors object to js object
 */
module.exports = function themeLoader(source) {
  const processed = source
    .replace(/\$colors :=/, 'module.exports =')
    .replace(/([a-zA-Z0-9_-]+):/g, '"$1":')
    .replace(/(#[a-fA-F0-9]{6})/g, '"$1"');
  return processed;
};
