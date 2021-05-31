<template lang="pug">
.z-textarea
  .z-textarea__label(v-if="label")
    z-label {{ label }}
  textarea.z-textarea__textarea(
    :name="name"
    :type="type"
    :class="textareaClasses"
    v-model="proxy__value"
    @focus="focused = true"
    @blur="focused = false"
  )
  .z-textarea__caption
    small(v-html="caption")
</template>

<style lang="stylus">
@import '../../styles/components.styl'

.z-textarea
  display flex
  flex-direction column
  padding-bottom size(2)
  width 100%

  .z-textarea__label
    display flex
    justify-content space-between
    margin-bottom size(1)

  > label
    margin-bottom size(1)

  > .z-textarea__textarea
    padding size(0.5) size(2)
    color: $colors.neutral.dark-3
    border: 1px solid $colors.neutral.light-3
    background white
    border-radius size(0.5)
    outline none

    &--focused
      border: 1px solid $colors.neutral.base
</style>

<script>
import ZLabel from '../../components/ZLabel';
import proxy from '../../mixins/proxy';

export default {
  name: 'ZTextarea',
  components: { ZLabel },
  mixins: [proxy('value')],
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    color: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    caption: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    // any type
    value: null,
  },
  data() {
    return {
      openMenu: false,
      focused: false,
    };
  },
  computed: {
    textareaClasses() {
      const classes = [];
      if (this.color) classes.push('border--' + this.color);
      if (this.focused) classes.push('z-textarea__textarea--focused');
      return classes;
    },
  },
};
</script>
