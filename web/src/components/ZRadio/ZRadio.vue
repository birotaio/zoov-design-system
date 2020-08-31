<template lang="pug">
  .z-radio(:class="classes")
    .z-radio__input(:class="'text--' + color")
      .z-radio__icon
      .z-radio__icon--overlay
      input(
        ref="radio"
        role="radio"
        type="radio"
        :name="name"
        :value="inputValue"
        :aria-checked="String(proxy__value === inputValue)"
        :disabled="disabled"
        v-model="proxy__value"
        @focus="onFocus"
        @blur="onBlur"
      )
    z-label(@click="check" :class="{ 'text--neutral--dark-1': disabled }") {{ label }}
</template>

<style lang="stylus">
@import '../../styles/components.styl';

.z-radio
  padding size(1) 0
  display inline-flex
  align-items center

  .z-radio__input
    position relative
    rounded(2.5)

    input
      position absolute
      z-index 2
      opacity 0
      width 100%
      height 100%
      cursor pointer
      user-select none
      margin 0

  .z-radio__icon
    position absolute
    z-index 0
    rounded(2.5)
    box-sizing border-box
    background-color: $colors.neutral.light-4
    border: 1px solid $colors.neutral.dark-1
    transition border-color 0.1s, background-color 0.1s

    &::before
      content ''
      display block
      position absolute
      top 5px
      left 5px
      rounded(1)
      background-color transparent
      transition background-color 0.1s

  .z-radio__icon--overlay
    position absolute
    rounded(2.5)
    box-sizing border-box
    background-color transparent
    transition background-color 0.1s
    z-index 1

  &:hover:not(.z-radio--disabled)
    .z-radio__icon
      border-color currentColor

  &.z-radio--focused
    .z-radio__icon
      background-color: $colors.neutral.light-2
      border-color: $colors.neutral.dark-2

  &--checked
    .z-radio__icon
      background-color transparent
      border-color currentColor

      &::before
        background-color currentColor

      svg
        left 4px
        top 5px

  &.z-radio--checked
    &:hover:not(.z-radio--disabled)
      .z-radio__icon
        border-color currentColor

      .z-radio__icon--overlay
        background-color rgba(255, 255, 255, 0.25)

    &.z-radio--focused
      .z-radio__icon
        border-color currentColor
        background-color transparent

      .z-radio__icon--overlay
        background-color rgba(255, 255, 255, 0.25)
        border: 1px solid currentColor

    &.z-radio--disabled
      .z-radio__icon
        border-color: $colors.neutral.light-1

        &::before
          background-color: $colors.neutral.light-1

  .z-label
    padding-left size(1)
    cursor pointer

  &.z-radio--disabled
    .z-radio__icon
      background-color: $colors.neutral.light-4
      border-color: $colors.neutral.light-2

    .z-label, input
      cursor not-allowed
</style>

<script>
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
    color: {
      type: String,
      default: 'primary',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: '',
    },
    // any type
    value: null,
    inputValue: null,
  },
  data() {
    return {
      focused: false,
    };
  },
  computed: {
    checked() {
      return this.proxy__value === this.inputValue;
    },
    classes() {
      const classes = [];
      if (this.checked) classes.push('z-radio--checked');
      if (this.disabled) classes.push('z-radio--disabled');
      if (this.focused) classes.push('z-radio--focused');
      return classes;
    },
  },
  methods: {
    check() {
      if (!this.disabled) {
        this.proxy__value = this.inputValue;
      }
    },
    onFocus() {
      this.focused = true;
    },
    onBlur() {
      this.focused = false;
    },
  },
};
</script>
