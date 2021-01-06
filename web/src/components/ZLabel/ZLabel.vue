<template lang="pug" functional>
  label.z-label(
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

.z-label
  color $label-color
</style>

<script>
export default {
  name: 'ZLabel',
};
</script>
