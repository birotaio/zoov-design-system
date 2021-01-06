<template lang="pug" functional>
  .z-container(
    :ref="data.ref"
    :class="[data.class, data.staticClass]"
    :style="[data.style, data.staticStyle, $options.methods.style(props)]"
    :key="data.key"
    v-on="listeners"
  )
    slot
</template>

<style lang="stylus">
@import '../../styles/components.styl';

.z-container
  width 100%
  margin 0 auto
  position relative
</style>

<script>
import { hasUnits, getCssVar } from '../../modules/utils';

export default {
  name: 'ZContainer',
  props: {
    width: {
      type: [Number, String],
      default: null,
    },
  },
  methods: {
    style(props) {
      const style = {};
      const step = getCssVar('--step', 8);
      const width = props.width;
      const widthStr = width
        ? hasUnits(width)
          ? width
          : `${width * step}px`
        : null;
      if (widthStr) {
        style.maxWidth = widthStr;
      }
      return style;
    },
  },
};
</script>
