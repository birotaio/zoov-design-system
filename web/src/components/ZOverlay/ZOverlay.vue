<template lang="pug">
  transition(name="zt-fade")
    .z-overlay(
      v-if="proxy__value"
      :style="style"
      @click="onClick"
    )
</template>

<style lang="stylus">
@import '../../styles/components.styl';

.z-overlay
  fixed-full()
  z-index 10
  background-color $overlay-color
</style>

<script>
import proxy from '../../mixins/proxy';

export default {
  name: 'ZOverlay',
  mixins: [proxy('value')],
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    clipPath: {
      type: String,
      default: '',
    },
    closeOnClick: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    style() {
      return this.clipPath ? { clipPath: this.clipPath } : {};
    },
  },
  methods: {
    onClick() {
      if (this.closeOnClick) this.proxy__value = false;
    },
  },
};
</script>
