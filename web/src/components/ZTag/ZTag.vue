  .z-tag.px-1(:style="{ 'background': background, 'color': color }")
<template lang="pug" functional>
.z-tag(
  :ref="data.ref"
  :style="[data.style, data.staticStyle]"
  v-on="listeners"
)
  small.z-tag__content
    slot
</template>

<style lang="stylus">
@import '~@zoov/design-system/src/styles/components';
.z-tag
  // display: inline-block
  max-width max-content
  border-radius size(2.5)
</style>

<script>
export default {
  name: 'Ztag',
  props: {
    background: {
      type: String,
      default: 'white',
    },
    color: {
      type: String,
      default: 'black',
    },
  },
};
</script>
