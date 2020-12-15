export default {
  sticky: function() {
    if (!process.browser) return false;

    var prop = 'position:';
    var value = 'sticky';
    var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');

    var el = document.createElement('a');
    var mStyle = el.style;
    mStyle.cssText =
      prop + prefixes.join(value + ';' + prop).slice(0, -prop.length);

    return mStyle.position.indexOf(value) !== -1;
  },
};
