<template lang="pug">
  .z-tooltip(:class="classes")
    transition(name="zt-fade")
      z-info-bubble(v-if="proxy__value" :valign="infoBubbleValign" :halign="infoBubbleHalign" :style="infoBubbleStyle")
        slot
    .z-tooltip__activator(
      ref="activator"
      @mouseenter="onEnterActivator"
      @mouseleave="onLeaveActivator"
    )
      slot(name="activator" :activate="forwardActivate" :deactivate="forwardDeactivate")
</template>

<style lang="stylus">
.z-tooltip
  position relative
  z-index 1

  > .z-info-bubble
    position absolute

  &--bottom
    > .z-info-bubble
      bottom 0

.z-tooltip__activator
  display flex
</style>

<script>
import ZInfoBubble from '../ZInfoBubble';
import proxy from '../../mixins/proxy';
import { throttle, sizeStyle } from '../../modules/utils';

export default {
  name: 'ZTooltip',
  mixins: [proxy('value')],
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    valign: {
      type: String,
      validator(value) {
        return ['top', 'bottom'].includes(value);
      },
      default: 'bottom',
    },
    halign: {
      type: String,
      validator(value) {
        return ['left', 'center', 'right'].includes(value);
      },
      default: 'right',
    },
    noHover: {
      type: Boolean,
      default: false,
    },
    hideDelay: {
      type: Number,
      default: 2500,
    },
    minWidth: {
      type: [Number, String],
      default: null,
    },
  },
  data() {
    return {
      activatorWidth: 0,
      throttledOnResize: throttle(this.onResize, 500),
      timeout: null,
    };
  },
  mounted() {
    this.getActivatorWidth();
    window.addEventListener('resize', this.throttledOnResize, { passive: true });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.throttledOnResize);
  },
  computed: {
    classes() {
      const classes = [];
      classes.push('z-tooltip--' + this.valign);
      classes.push('z-tooltip--' + this.halign);
      return classes;
    },
    infoBubbleStyle() {
      let xtrans, ytrans;
      switch (this.halign) {
        case 'right':
          xtrans = `calc(0% + ${ this.activatorWidth / 2 - 4}px)`;
          break;
        case 'center':
          xtrans = `calc(-50% + ${ this.activatorWidth / 2}px)`;
          break;
        case 'left':
          xtrans = `calc(-100% + ${ this.activatorWidth / 2 + 4}px)`;
          break;
      }
      switch (this.valign) {
        case 'top':
          ytrans = `calc(-100% - 8px)`;
          break;
        case 'bottom':
          ytrans = `calc(100% + 8px)`;
          break;
      }
      const style = { transform: `translate(${xtrans}, ${ytrans})` };
      if (this.minWidth) {
        style['min-width'] = sizeStyle(this.minWidth, { height: false })['min-width'];
      }
      return style;
    },
    infoBubbleValign() {
      switch (this.valign) {
        case 'top':
          return 'bottom';
        case 'bottom':
          return 'top';
      }
    },
    infoBubbleHalign() {
      switch (this.halign) {
        case 'right':
          return 'left';
        case 'center':
          return 'center';
        case 'left':
          return 'right';
      }
    },
  },
  methods: {
    onResize() {
      this.getActivatorWidth();
    },
    getActivatorWidth() {
      if (this.$refs.activator) {
        const rect = this.$refs.activator.getBoundingClientRect();
        this.activatorWidth = rect.width;
      }
    },
    onEnterActivator() {
      if (!this.noHover) {
        this.proxy__value = true;
      }
    },
    onLeaveActivator() {
      if (!this.noHover) {
        this.proxy__value = false;
      }
    },
    forwardActivate() {
      this.proxy__value = true;
      if (!this.hideDelay || this.hideDelay === Infinity) return;
      // hide after a given delay
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => (this.proxy__value = false), this.hideDelay);
    },
    forwardDeactivate() {
      this.proxy__value = false;
    },
  },
};
</script>
