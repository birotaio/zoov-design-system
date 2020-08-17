<template lang="pug">
  .z-dialog
    .z-dialog__activator(@click.stop="onClickActivator")
      slot(name="activator" :activate="onClickActivator")
    z-overlay(:value="proxy__value")
    transition(name="zt-fade")
      .z-dialog__content(v-if="proxy__value")
        z-card.elevation-5
          slot
</template>

<style lang="stylus">
@import '../../styles/components.styl';

.z-dialog
  display inline-block

  &__content
    fixed-centered()
    z-index 11
</style>

<script>
import ZCard from '../../components/ZCard';
import ZOverlay from '../../components/ZOverlay';
import proxy from '../../mixins/proxy';
import { isClient } from '../../modules/utils';

// cannot be used in SSR
if (isClient) require('element-closest-polyfill');

export default {
  name: 'ZMenu',
  components: { ZCard, ZOverlay },
  mixins: [proxy('value')],
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClickActivator() {
      this.proxy__value = !this.proxy__value;
    },
    onClickWindow(e) {
      if (!e.target.closest('.z-dialog__content')) {
        this.proxy__value = false;
      }
    },
  },
  watch: {
    proxy__value(newVal) {
      if (isClient) {
        if (newVal) {
          window.addEventListener('click', this.onClickWindow);
        } else {
          window.removeEventListener('click', this.onClickWindow);
        }
      }
    },
  },
};
</script>
