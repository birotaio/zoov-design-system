<template lang="pug" functional>
  .z-card(
    :ref="data.ref"
    :class="[data.class, data.staticClass, { 'z-card--dense': props.dense }]"
    :style="[data.style, data.staticStyle]"
    v-on="listeners"
  )
    .z-card__header
      slot(name="header")
    .z-card__content
      slot
    .z-card__footer
      slot(name="footer")
</template>

<style lang="stylus">
@import '../../styles/components.styl';

.z-card
  border-radius size(1)
  elevation(1)
  overflow hidden
  > :last-child
    margin-bottom 0

.z-card__content
  padding size(2)

.z-card__actions
  padding size(1)
  display flex

.z-card.z-card--dense
  .z-card__content
    padding size(1) size(2)
</style>

<script>
import ZDivider from '../ZDivider';

export default {
  name: 'ZCard',
  components: { ZDivider },
  props: {
    dense: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
