/* Entry file for lib build */

import zds from '.';
import * as components from './components';

export function install(Vue) {
  zds.install(Vue, { components });
}

if (window && window.Vue) {
  window.Vue.use(zds, { components });
}
