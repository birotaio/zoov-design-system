<template lang="pug" functional>
  .z-card(
    :ref="data.ref"
    :class="[data.class, data.staticClass, { 'z-card--dense': props.dense }]"
    :style="[data.style, data.staticStyle]"
    v-on="listeners"
  )
    slot
</template>

<style lang="stylus">
@import '../../styles/components.styl';

.z-card
  border-radius size(1)
  padding size(2)
  elevation(1)
  > :last-child
    margin-bottom 0

  &.z-card--dense
    padding size(1) size(2)
</style>

<script>
export default {
  name: 'ZCard',
  props: {
    dense: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
