<template lang="pug" functional>
  .z-coupon(
    :ref="data.ref"
    :class="[data.class, data.staticClass]"
    :style="[data.style, data.staticStyle]"
    :key="data.key"
    v-on="listeners"
  )
    slot
</template>

<style lang="stylus">
@import '../../styles/components.styl';

.z-coupon
  display inline-block
  background-image linear-gradient($colors.secondary.base, $colors.secondary.base);
  background-size 100% 85%
  background-position 0% 100%
</style>

<script>
export default {
  name: 'ZCoupon',
};
</script>
