<template lang="pug" functional>
  .z-loader(
    :ref="data.ref"
    :class="[data.class, data.staticClass, ...$options.methods.classes(props)]"
    :style="[data.style, data.staticStyle, $options.methods.style(props)]"
    v-on="listeners"
  )
    template(v-if="props.circular")
      svg(viewBox="0 0 24 24" :class="props.color ? 'text--' + props.color : ''")
       path.z-loader__circular-path(stroke="currentColor" d="M 20 12 A 8 8 0 1 1 13 4")
    template(v-else v-for="i in [1, 2, 3, 4]")
      .z-loader__dot(:class="props.color")
</template>

<style lang="stylus">
@import '../../styles/components.styl';

.z-loader
  width 24px
  height 24px
  display inline-block
  position relative

.z-loader--circular svg
  animation z-loader-circular-rotate 1.8s linear infinite

  path.z-loader__circular-path
    fill none !important

.z-loader__dot
  background-color currentColor

@keyframes z-loader-circular-rotate
  0%
    transform rotate(0)

  100%
    transform rotate(360deg)

.z-loader--ellipsis div
  position absolute
  top 40%
  width 25%
  height 25%
  border-radius 50%
  animation-timing-function cubic-bezier(0, 1, 1, 0)

.z-loader--ellipsis div:nth-child(1)
  left 0%
  animation z-loader-ellipsis-1 0.6s infinite

.z-loader--ellipsis div:nth-child(2)
  left 0%
  animation z-loader-ellipsis-2 0.6s infinite

.z-loader--ellipsis div:nth-child(3)
  left 37.5%
  animation z-loader-ellipsis-2 0.6s infinite

.z-loader--ellipsis div:nth-child(4)
  left 75%
  animation z-loader-ellipsis-3 0.6s infinite

@keyframes z-loader-ellipsis-1
  0%
    transform scale(0)

  100%
    transform scale(1)

@keyframes z-loader-ellipsis-2
  0%, 10%
    transform translate(0, 0)

  90%, 100%
    transform translate(150%, 0)

@keyframes z-loader-ellipsis-3
  0%
    transform scale(1)

  100%
    transform scale(0)
</style>

<script>
import { sizeStyle } from '../../modules/utils';

export default {
  name: 'ZLoader',

  props: {
    size: {
      type: [String, Number],
      default: null,
    },
    color: {
      type: String,
      default: '',
    },
    circular: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    classes(props) {
      const classes = [];
      if (props.circular) classes.push('z-loader--circular');
      else classes.push('z-loader--ellipsis');
      return classes;
    },
    style(props) {
      return sizeStyle(props.size);
    },
  },
};
</script>
