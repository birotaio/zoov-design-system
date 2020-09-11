import { throttle, isClient, getClientWidth } from './modules/utils';
import directives from './directives';
import './styles/index.styl';

export default {
  install: function(Vue, options = {}) {
    Object.entries(options.components || {}).forEach(([name, component]) => {
      Vue.component(name, component);
    });

    /*
     * zds instance
     */
    const zds = {};
    Vue.util.defineReactive(zds, 'client', isClient);

    /*
     * Breakpoint watcher
     */
    const breakpoints = {
      xxs: 360,
      xs: 600,
      sm: 960,
      md: 1200,
      lg: 1920,
    };

    Vue.util.defineReactive(zds, 'breakpoint', {});
    Object.keys(breakpoints).forEach(key => {
      Vue.util.defineReactive(zds.breakpoint, key, false);
    });

    Vue.util.defineReactive(zds, 'clientWidth', 0);
    function onResize() {
      zds.clientWidth = getClientWidth();
      Object.entries(breakpoints).forEach(([key, value]) => {
        zds.breakpoint[key] = zds.clientWidth < value;
      });
    }

    function initBreakpointWatcher() {
      if (!isClient) return;
      window.addEventListener('resize', throttle(onResize, 250), {
        passive: true,
      });
      onResize();
    }
    // init
    initBreakpointWatcher();

    /*
     * Client-side custom directives
     */
    Object.entries(directives.client).forEach(([name, settings]) => {
      Vue.directive(name, settings);
    });

    /*
     * Touch device check
     */
    Vue.util.defineReactive(zds, 'isTouchDevice', false);
    function initTouchDeviceChecker() {
      if (!isClient) return;
      window.addEventListener(
        'touchstart',
        function _hasTouch() {
          if (typeof options.onDedectTouchDevice === 'function') {
            options.onDedectTouchDevice();
          }
          zds.isTouchDevice = true;
          window.removeEventListener('touchstart', _hasTouch, {
            passive: true,
          });
        },
        { passive: true }
      );
    }
    // init
    initTouchDeviceChecker();

    /*
     * App-wize communication
     */
    Vue.util.defineReactive(zds, 'app', {});
    Vue.util.defineReactive(zds.app, 'drawer', null);

    /*
     * Register instance
     */
    Vue.prototype.$zds = zds;
  },
};
