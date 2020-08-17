<template lang="pug">
  .z-radio(:class="classes")
    .z-radio__input
      .z-radio__icon
      .z-radio__icon--overlay
      input(
        ref="radio"
        role="radio"
        type="radio"
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
      border-color: $colors.primary.base

  &.z-radio--focused
    .z-radio__icon
      background-color: $colors.neutral.light-2
      border-color: $colors.neutral.dark-2

  &--checked
    .z-radio__icon
      background-color transparent
      border-color: $colors.primary.base

      &::before
        background-color: $colors.primary.base

      svg
        left 4px
        top 5px

  &.z-radio--checked
    &:hover:not(.z-radio--disabled)
      .z-radio__icon
        border-color: $colors.primary.base

      .z-radio__icon--overlay
        background-color rgba(255, 255, 255, 0.25)

    &.z-radio--focused
      .z-radio__icon
        border-color: $colors.primary.base
        background-color transparent

      .z-radio__icon--overlay
        background-color rgba(255, 255, 255, 0.25)
        border: 1px solid $colors.primary.base

    &.z-radio--disabled
      .z-radio__icon
        border-color: $colors.neutral.light-1

        &::before
          background-color: $colors.neutral.light-1

  .z-label
    margin-left size(1)
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
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
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
