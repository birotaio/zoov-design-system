import Vue from 'vue';
import Router from 'vue-router';
import Sandbox from './Sandbox.vue';

Vue.use(Router);

// the router instance for testing
const router = new Router();

import zds from '@';
import * as components from '@/components';

Vue.use(zds, { components });

Vue.config.productionTip = false;

new Vue({ router, render: h => h(Sandbox) }).$mount('#app');
