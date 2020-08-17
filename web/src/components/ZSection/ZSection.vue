<template lang="pug" functional>
  section.z-section(
    :ref="data.ref"
    :class="[data.class, data.staticClass]"
    :style="[data.style, data.staticStyle]"
    v-on="listeners"
  )
    slot
</template>

<style lang="stylus">
section.z-section
  padding size(9) size(5)

+media-down('xs')
  section.z-section
    padding size(6) size(3)

+media-down('xxs')
  section.z-section
    padding size(4) size(3)

</style>

<script>
export default {
  name: 'ZSection',
};
</script>
