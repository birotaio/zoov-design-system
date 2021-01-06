<template lang="pug" functional>
  .spacer(
    :ref="data.ref"
    :class="[data.class, data.staticClass]"
    :style="[data.style, data.staticStyle]"
    :key="data.key"
    v-on="listeners"
  )
</template>

<script>
export default {
  name: 'ZSpacer',
};
</script>
