<template lang="pug">
  .z-info-bubble(:class="classes")
    svg.z-info-bubble__shape(xmlns="http://www.w3.org/2000/svg" width="48" height="34" viewbox="0 0 48 34")
      path(:d="path")
    .z-info-bubble__content
      slot
</template>

<style lang="stylus">
.z-info-bubble
  display inline-block
  min-width size(8)
  min-height size(4)
  filter: drop-shadow(0px 2px 4px alpha($colors.neutral.dark-3, 25%));
  position relative

  svg.z-info-bubble__shape
    position absolute
    z-index -1
    transform-origin center center

    path
      fill white

.z-info-bubble--left
  svg.z-info-bubble__shape
    transform scale(-1, 1)
    left 0

.z-info-bubble--right
  svg.z-info-bubble__shape
    right 0

.z-info-bubble--center
  svg.z-info-bubble__shape
    left 50%
    margin-left size(-3)

.z-info-bubble--bottom
  padding-bottom size(2)

  svg.z-info-bubble__shape
    bottom 0

.z-info-bubble--top
  padding-top size(2)

  svg.z-info-bubble__shape
    top 0

  &.z-info-bubble--left
    svg.z-info-bubble__shape
      transform scale(-1, -1)

  &.z-info-bubble--center,
  &.z-info-bubble--right
    svg.z-info-bubble__shape
      transform scale(1, -1)

.z-info-bubble__content
  border-radius size(2)
  min-height size(4)
  padding size(0.5) size(2.25)
  background-color white
  display flex
  align-items center

  .z-icon
    &:first-child
      margin-left -1 * size(1)
      margin-right size(1)

    &:last-child
      margin-right -1 * size(1)
      margin-left size(1)
</style>

<script>
import centerPath from '../../assets/info-bubble/info-bubble-center-path';
import sidePath from '../../assets/info-bubble/info-bubble-side-path';

export default {
  name: 'ZInfoBubble',
  props: {
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
  },
  computed: {
    path() {
      return this.halign === 'center' ? centerPath : sidePath;
    },
    classes() {
      const classes = [];
      classes.push('z-info-bubble--' + this.valign);
      classes.push('z-info-bubble--' + this.halign);
      return classes;
    },
  },
};
</script>
