// load client script client-side only
let simpleParallax;
if (process.browser) {
  simpleParallax = require('../assets/lib/simpleParallax.min.js');
}
/*
 * Directives
 */
const defaultParallaxOptions = {
  scale: 1.5,
  delay: .5,
  transition: 'cubic-bezier(0,0,0,1)',
  overflow: true,
};

export default {
  // client side settings
  client: {
    // v-client directive
    client: {
      bind(el, binding) {
        const transition = binding.value || 'fade';
        el.classList.remove('v-client');
        if (transition === 'fade') {
          el.classList.add('v-client--fade');
        }
      },
    },
    // v-parallax directive
    parallax: {
      inserted(el, binding, vnode) {
        const directiveOptions = binding.value || {};
        const options = { ...defaultParallaxOptions, ...directiveOptions };
        vnode.simpleParallaxInstance = new simpleParallax(el, options);
      },
      componentUpdated(el, binding, vnode, oldVnode) {
        if (oldVnode && oldVnode.simpleParallaxInstance) {
          oldVnode.simpleParallaxInstance.destroy();
        }
        const directiveOptions = binding.value || {};
        const options = { ...defaultParallaxOptions, ...directiveOptions };
        vnode.simpleParallaxInstance = new simpleParallax(el, options);
      },
    },
  },
  // server-side rendering settings
  ssr: {
    // v-client directive
    client(vnode) {
      vnode.data.staticClass = vnode.data.staticClass
        .split(' ')
        .concat('v-client')
        .join(' ');
    },
  },
};
