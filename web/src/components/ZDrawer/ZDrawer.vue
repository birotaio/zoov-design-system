<template lang="pug">
  .z-drawer__wrapper
    .z-drawer__overlay(v-show="!moveApp")
      z-overlay(v-model="proxy__value" close-on-click)
    .z-drawer(:class="classes" :style="style")
      .z-drawer__controls(v-if="controls" @click="proxy__value = !proxy__value")
        z-icon.z-drawer__controls__icon(
          :size="controlsSize"
          :class="{ 'z-drawer__controls__icon--rotate': proxy__value }"
        ) arrow-left
      .z-drawer__content
        slot
</template>

<style lang="stylus">
@import '../../styles/components.styl'

.z-drawer
  position fixed
  top 0
  left 0
  bottom 0
  background-color: $colors.neutral.light-4
  z-index 11
  transition transform $transform-duration $ease

  &.z-drawer--right
    left auto
    right 0

  &.z-drawer--small-controls
    .z-drawer__controls
      width size(5)
      height size(5)
      right size(-5)

      +media-down('xs')
        width size(4)
        height size(4)
        right size(-4)

.z-drawer__content
  height 100%
  max-height 100%
  overflow auto

.z-drawer__controls
  width size(6)
  height size(6)
  background-color: $colors.neutral.dark-2
  color white
  position absolute
  right size(-6)
  top size(4)
  cursor pointer
  box-shadow: 0 4px 8px alpha($colors.neutral.dark-3, 25%)

  +media-down('xs')
    width size(5)
    height size(5)
    right size(-5)

.z-drawer__controls__icon
  transition transform $rotate-duration $ease

  &--rotate
    transform rotate(180deg)
</style>

<script>
import ZIcon from '../../components/ZIcon';
import ZOverlay from '../../components/ZOverlay';
import proxy from '../../mixins/proxy';
import { sizeStyle } from '../../modules/utils';

export default {
  name: 'ZDrawer',
  mixins: [proxy('value')],
  components: { ZIcon, ZOverlay },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [Number, String],
      default: 30,
    },
    right: {
      type: Boolean,
      default: false,
    },
    app: {
      type: Boolean,
      default: false,
    },
    controls: {
      type: Boolean,
      default: false,
    },
    smallControls: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    classes() {
      const classes = [];
      if (this.right) classes.push('z-drawer--right');
      if (this.smallControls) classes.push('z-drawer--small-controls');
      return classes;
    },
    widthStyle() {
      return sizeStyle(this.width, { height: false });
    },
    positionStyle() {
      if (this.proxy__value) return {};
      else {
        const sign = this.right ? '' : '-';
        const value = sign + this.widthStyle.width;
        return { transform: `translate3d(${value}, 0, 0)` };
      }
    },
    style() {
      return {
        ...this.positionStyle,
        ...this.widthStyle,
      };
    },
    appDrawer() {
      return {
        value: this.proxy__value,
        width: this.widthStyle.width,
        right: this.right,
      };
    },
    moveApp() {
      return this.app && !this.$zds.breakpoint.sm;
    },
    controlsSize() {
      if (this.smallControls) {
        if (this.$zds.breakpoint.xs) return 4;
        else return 5;
      } else {
        if (this.$zds.breakpoint.xs) return 5;
        else return 6;
      }
    },
  },
  watch: {
    appDrawer: {
      immediate: true,
      handler() {
        if (this.moveApp) {
          this.$zds.app.drawer = this.appDrawer;
        }
      },
    },
    moveApp() {
      if (!this.moveApp) this.$zds.app.drawer = null;
      else this.$zds.app.drawer = this.appDrawer;
    },
  },
};
</script>
