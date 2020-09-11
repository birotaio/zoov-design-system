import Vue from 'vue';
import Sandbox from './Sandbox.vue';

import zds from '@';
import * as components from '@/components';

Vue.use(zds, { components });

Vue.config.productionTip = false;

new Vue({ render: h => h(Sandbox) }).$mount('#app');
