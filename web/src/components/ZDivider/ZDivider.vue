<template lang="pug" functional>
  .z-divider(
    :ref="data.ref"
    :class="[data.class, data.staticClass, $options.methods.computeClasses(props)]"
    :style="[data.style, data.staticStyle, $options.methods.computeStyle(props)]"
    v-on="listeners"
  )
</template>

<style lang="stylus">
@import '../../styles/components.styl';

.z-divider
  width 100%
  height 1px
  margin size(1) 0
  overflow hidden
  transition height $transform-duration $ease

  &--dark
    background-color: alpha($colors.secondary.base, 25%)

  &--light
    background-color: alpha($colors.white.base, 50%)

  &.z-divider--vertical
    width 1px
    height auto
    margin 0 size(1)

  &--loading
    &:before
      content ''
      display block
      width 100%
      height 100%
      background-color: $colors.primary.base
      transform translate(50px)
      animation z-divider-loading-animation 2.6s $ease infinite

@keyframes z-divider-loading-animation
  0%
    transform translate(-100%)

  100%
    transform translate(100%)
</style>

<script>
import { sizeStyle } from '../../modules/utils';

export default {
  name: 'ZDivider',
  props: {
    light: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [String, Number],
      default: null,
    },
    height: {
      type: [String, Number],
      default: null,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    computeClasses(props) {
      const classes = [];
      classes.push(props.light ? 'z-divider--light' : 'z-divider--dark');
      if (props.loading) classes.push('z-divider--loading');
      if (props.vertical) classes.push('z-divider--vertical');
      return classes;
    },
    computeStyle(props) {
      return {
        ...(props.height ? sizeStyle(props.height, { width: false }) : {}),
        ...(props.width ? sizeStyle(props.width, { height: false }) : {}),
      };
    },
  },
};
</script>
