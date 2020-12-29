  .z-tag.px-1(:style="{ 'background': background, 'color': color }")
    p.z-tag__text {{ text }}
<template lang="pug" functional>
.z-tag(
  :ref="data.ref"
  :style="[data.style, data.staticStyle]"
  v-on="listeners"
)
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
    text: {
      type: String,
      default: 'default',
    },
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
