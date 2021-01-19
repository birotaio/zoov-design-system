<template lang="pug" functional>
component.z-tag(
  :ref="data.ref"
  :class="[data.class, data.staticClass, $options.methods.computeClasses(props)]"
  :style="[data.style, data.staticStyle]"
  :key="data.key"
  :is="props.to || props.href ? 'z-link' : 'div'"
  v-bind="['to', 'href', 'hreflang', 'target'].reduce((p, key) => (p[key] = props[key]) && p || p, {})"
  v-on="listeners"
)
  .z-tag__background(:class="[props.color]")
  .z-tag__content
    slot
</template>

<style lang="stylus">
@import '../../styles/components.styl'

.z-tag
  position relative
  display inline-block
  padding 0 size(1)
  max-width max-content
  text-transform uppercase
  typgraphy('title')
  color: $colors.neutral.dark-4
  height size(3)
  border-radius size(1.5)

  &--colored
    .z-tag__background
      opacity 0.1

  &--small
    typography('caption')
    color: $colors.neutral.dark-4
    height size(2)
    border-radius size(1)

    .z-tag__background
      border-radius size(1)

  &--link
    elevation-transition(true)

    &:hover
      elevation-shadow-light(2)

.z-tag__background
  absolute-full()
  background-color white
  border-radius size(1.5)
  z-index 0

.z-tag__content
  display flex
  place-content center
  position relative
  z-index 1
</style>

<script>
export default {
  name: 'Ztag',
  props: {
    color: {
      type: String,
      default: '',
    },
    small: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
      default: null,
    },
    href: {
      type: String,
      default: null,
    },
    hreflang: {
      type: String,
      default: null,
    },
    target: {
      type: String,
      default: null,
    },
  },
  methods: {
    computeClasses(props) {
      const classes = [];
      if (props.color) {
        classes.push('text--' + props.color);
        classes.push('z-tag--colored');
      }
      if (props.small) classes.push('z-tag--small');
      if (props.to || props.href) classes.push('z-tag--link');
      return classes;
    },
  },
};
</script>
