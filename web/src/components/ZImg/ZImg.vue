<template lang="pug" functional>
  img.z-img(
    :ref="data.ref"
    :class="[data.class, data.staticClass]"
    :style="[data.style, data.staticStyle]"
    v-bind="props"
    v-on="listeners"
  )
</template>

<style lang="stylus">
@import '../../styles/components.styl';

.z-img
  border-radius size(2)
  width 100%
</style>

<script>
export default {
  name: 'ZImg',
};
</script>
