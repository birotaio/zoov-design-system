<template lang="pug" functional>
.z-tag(
  :ref="data.ref"
  :class="[data.class, data.staticClass, props.color ? 'text--' + props.color : '']"
  :style="[data.style, data.staticStyle]"
  v-on="listeners"
)
  .z-tag__background(:class="[props.color, props.color ? 'z-tag__background--colored' : '']")
  small.z-tag__content
    slot
</template>

<style lang="stylus">
@import '../../styles/components.styl';

.z-tag
  position relative
  display inline-block
  padding 0 size(1)
  max-width max-content
  text-transform uppercase
  color: $colors.neutral.dark-4

.z-tag__background
  absolute-full()
  background-color white
  border-radius size(2.5)
  z-index 0

  &--colored
    opacity 0.1

.z-tag__content
  position relative
  z-index 1
</style>

<script>
export default {
  name: 'Ztag',
  props: {
    color: {
      type: String,
      default: '',
    },
  },
};
</script>
