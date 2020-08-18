<template lang="pug" functional>
  .z-layout(
    :ref="data.ref"
    :class="[data.class, data.staticClass]"
    :style="[data.style, data.staticStyle]"
    v-on="listeners"
  )
    .z-layout__container(:class="$options.methods.classes(props)")
      slot
</template>

<style lang="stylus">
@import '../../styles/components.styl';

.z-layout
  width 100%
  min-width 100%

  for $n in 1..4
    .z-layout__container.flex-layout--guttered-{$n}
      margin -0.5 * $n * $gutter-width

      .z-col
        margin 0.5 * $n * $gutter-width
</style>

<script>
const alignments = ['', 'start', 'center', 'end'];
const justifications = alignments.concat('space-between');

export default {
  name: 'ZLayout',
  props: {
    align: {
      type: String,
      default: '',
      validator: value => alignments.includes(value),
    },
    justify: {
      type: String,
      default: '',
      validator: value => justifications.includes(value),
    },
    reverse: {
      type: Boolean,
      default: false,
    },
    column: {
      type: Boolean,
      default: false,
    },
    gutter: {
      type: [Boolean, String, Number],
      default: false,
    },
  },
  methods: {
    classes(props) {
      const classes = ['flex-layout'];
      if (Number(props.gutter)) classes.push('flex-layout--guttered-' + Number(props.gutter));
      if (props.align) classes.push('align--' + props.align);
      if (props.justify) classes.push('justify--' + props.justify);
      if (props.reverse) classes.push('flex-layout--reverse');
      if (props.column) classes.push('flex-layout--column');
      return classes;
    },
  },
};
</script>
