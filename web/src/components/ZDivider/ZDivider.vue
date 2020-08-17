<template lang="pug" functional>
  .z-divider(
    :ref="data.ref"
    :class="[data.class, data.staticClass, props.light ? 'z-divider--light' : 'z-divider--dark']"
    :style="[data.style, data.staticStyle]"
    v-on="listeners"
  )
</template>

<style lang="stylus">
@import '../../styles/components.styl';

.z-divider
  width 100%
  height 1px
  margin size(1) 0

  &--dark
    background-color: $colors.secondary.base
    opacity 0.25

  &--light
    background-color: $colors.white.base
    opacity 0.5
</style>

<script>
export default {
  name: 'ZDivider',
  props: {
    light: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
