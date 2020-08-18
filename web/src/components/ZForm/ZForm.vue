<template lang="pug" functional>
  form.z-form(
    :ref="data.ref"
    :class="[data.class, data.staticClass]"
    :style="[data.style, data.staticStyle]"
    v-bind="props"
    v-on="listeners"
  )
    slot
</template>

<style lang="stylus">
@import '../../styles/components.styl';

.z-form
  width 100%
</style>

<script>
export default {
  name: 'ZForm',
};
</script>
