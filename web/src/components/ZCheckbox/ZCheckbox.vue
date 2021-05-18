<template lang="pug">
  .z-checkbox(:class="classes")
    .z-checkbox__input(:class="color === 'white' ? 'text--neutral--light-3' : 'text--' + color")
      .z-checkbox__icon(
        v-html="iconMarkup"
        :class="color === 'white' ? 'z-checkbox__icon--dark' : ''"
      )
      .z-checkbox__icon--overlay
      input(
        ref="checkbox"
        role="checkbox"
        type="checkbox"
        :indeterminate.prop="indeterminate"
        :aria-checked="String(proxy__value)"
        :disabled="disabled"
        v-model="proxy__value"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      )
    z-label(@click="check" :class="{ 'text--neutral--dark-1': disabled }")
      div(v-html="label")
</template>

<style lang="stylus">
@import '../../styles/components.styl';

.z-checkbox
  padding size(1) 0
  display inline-flex
  align-items center

  .z-checkbox__input
    position relative
    width size(2.5)
    height size(2.5)

    input
      position absolute
      z-index 2
      opacity 0
      width 100%
      height 100%
      cursor pointer
      user-select none
      margin 0

  .z-checkbox__icon
    position absolute
    z-index 0
    width size(2.5)
    height size(2.5)
    border-radius size(0.5)
    box-sizing border-box
    background-color: $colors.neutral.light-4
    border: 1px solid $colors.neutral.dark-1
    transition border-color 0.1s, background-color 0.1s

    svg
      position absolute
      width 10px
      height 10px

      path
        fill #fff !important

    &.z-checkbox__icon--dark
      svg
        path
          fill: $colors.neutral.dark-4 !important

  .z-checkbox__icon--overlay
    position absolute
    width size(2.5)
    height size(2.5)
    border-radius size(0.5)
    box-sizing border-box
    background-color transparent
    transition background-color 0.1s
    z-index 1

  &:hover:not(.z-checkbox--disabled)
    .z-checkbox__icon
      border-color currentColor

  &.z-checkbox--focused
    .z-checkbox__icon
      background-color: $colors.neutral.light-2
      border-color: $colors.neutral.dark-2

  &--checked
    .z-checkbox__icon
      border-color currentColor
      background-color currentColor

      svg
        left 4px
        top 5px

  &--indeterminate:not(.z-checkbox--checked)
    .z-checkbox__icon
      border-color currentColor
      background-color currentColor

      svg
        left 4px
        top 8px

  &.z-checkbox--checked, &.z-checkbox--indeterminate
    &:hover:not(.z-checkbox--disabled)
      .z-checkbox__icon
        border-color currentColor

      .z-checkbox__icon--overlay
        background-color rgba(255, 255, 255, 0.25)

    &.z-checkbox--focused
      .z-checkbox__icon
        border-color currentColor
        background-color currentColor

      .z-checkbox__icon--overlay
        background-color rgba(255, 255, 255, 0.25)
        border: 1px solid currentColor

    &.z-checkbox--disabled
      .z-checkbox__icon
        background-color: $colors.neutral.light-1
        border-color: $colors.neutral.light-1

  .z-label
    padding-left size(1)
    cursor pointer

  &.z-checkbox--disabled
    .z-checkbox__icon
      background-color: $colors.neutral.light-4
      border-color: $colors.neutral.light-2

    .z-label, input
      cursor not-allowed
</style>

<script>
import checkSvgMarkup from '../../assets/checkbox/check.svg';
import indeterminateSvgMarkup from '../../assets/checkbox/indeterminate.svg';
import ZLabel from '../../components/ZLabel';
import proxy from '../../mixins/proxy';

export default {
  name: 'ZCheckbox',
  components: { ZLabel },
  mixins: [proxy('value')],
  props: {
    label: {
      type: String,
      default: '',
    },
    html: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'primary',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Boolean,
      default: false,
    },
    indeterminate: {
      type: Boolean,
      value: false,
    },
  },
  data() {
    return {
      focused: false,
    };
  },
  computed: {
    checked() {
      return this.proxy__value;
    },
    classes() {
      const classes = [];
      if (this.checked) classes.push('z-checkbox--checked');
      if (this.disabled) classes.push('z-checkbox--disabled');
      if (this.indeterminate) classes.push('z-checkbox--indeterminate');
      if (this.focused) classes.push('z-checkbox--focused');
      return classes;
    },
    iconMarkup() {
      return this.checked
        ? checkSvgMarkup
        : this.indeterminate
        ? indeterminateSvgMarkup
        : null;
    },
  },
  methods: {
    check() {
      if (!this.disabled) {
        this.proxy__value = !this.proxy__value;
      }
    },
    onFocus() {
      this.focused = true;
    },
    onBlur() {
      this.focused = false;
    },
    onInput() {
      if (this.indeterminate) this.$emit('update:indeterminate', false);
    },
  },
};
</script>
