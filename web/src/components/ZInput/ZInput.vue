<template lang="pug">
  .z-input(:class="classes", :style="style")
    .z-input__label(v-if="label || caption")
      z-label(@click="focus") {{ label }}
      caption(v-if="caption") {{ caption }}
    .z-input__wrapper
      .z-input__input(:class="inputClasses")
        input.z-input__input__field(
          ref="input"
          :name="name"
          :type="type"
          :placeholder="placeholder"
          :disabled="disabled"
          :required="required"
          :pattern="validationPattern"
          :readonly="readonly"
          v-model="valueProxy"
          @invalid.prevent="onInvalid"
          @focus="focused = true"
          @blur="focused = false"
        )
        .z-input__icon-within(v-if="iconWithin" @click="onClickIconWithin")
          template(v-if="copyable")
            z-tooltip(v-if="copyConfirmationText" valign="top" halign="left" no-hover)
              template(v-slot:activator="{ activate }")
                z-icon(@click="activate") copy
              .z-input__icon-within__click-confirmation {{ copyConfirmationText }}
            z-icon(v-else) copy
      z-button.z-input__button(v-if="submitButton" :loading="loading" :color="success ? 'success' : color || 'primary'" large submit)
        z-icon {{ success ? 'check-circle' : 'arrow-right' }}
    transition(name="zt-fade")
      .z-input__message(v-if="inputMessage" v-html="inputMessage")
</template>

<style lang="stylus">
@import '../../styles/components.styl';

.z-input
  padding size(1) 0
  display flex
  flex-direction column

  .z-input__label
    display flex
    justify-content space-between
    align-items baseline
    margin-bottom size(1)

    .z-label
      cursor pointer

    caption
      margin-bottom 0
      text-color($colors.neutral.dark-1)

  input.z-input__input__field
    box-sizing border-box
    width 100%
    min-width 0 // ff
    height size(6)
    padding-left size(2)
    padding-right size(2)
    padding-bottom 2px

    &:focus
      outline none

    &::placeholder
      color: $colors.neutral.dark-1

  .z-input__wrapper
    display flex
    align-items center

  .z-input__input
    margin size(0.5) 0
    height size(6)
    display flex
    flex-grow 1
    align-items center
    position relative
    box-sizing border-box
    background-color: $colors.neutral.light-5
    border: 1px solid $colors.neutral.light-3
    transition border 0.2s ease
    border-radius size(0.5)

    &--focused
      border: 1px solid $colors.neutral.base

    &--icon-within
      input.z-input__input__field
        padding-right 0


  .z-button.z-input__button
    padding 0 size(2)
    height size(6)
    display flex
    align-items center
    border-top-left-radius 0
    border-bottom-left-radius 0
    border-top-right-radius size(0.5)
    border-bottom-right-radius size(0.5)

    &:not(.z-button--icon) .z-icon:last-child
      margin 0

  .z-input__message
    height 0
    overflow visible
    typography-rules($typography.caption);

  &--readonly
    .z-input__label
      .z-label
        cursor default

  &--invalid, &--error
    .z-input__message
      text-color($colors.danger.base);

  &--submit-button
    .z-input__input
      border-top-right-radius 0
      border-bottom-right-radius 0

  &--disabled
    .z-input__label
      .z-label
        cursor not-allowed

    .z-input__input
      cursor not-allowed
      background-color: $colors.neutral.light-4

      &::placeholder
        color: $colors.neutral.light-2

  &--transparent
    .z-input__input
      background-color transparent

.z-input__icon-within
  height 100%
  display flex
  justify-content center
  align-items center
  padding 0 size(1)
  cursor pointer

.z-input__icon-within__click-confirmation
  white-space pre

</style>

<script>
import { hasUnits, getCssVar } from '../../modules/utils';

import ZLabel from '../../components/ZLabel';
import ZIcon from '../../components/ZIcon';
import ZButton from '../../components/ZButton';
import ZTooltip from '../../components/ZTooltip';

const emailPattern =
  '^[a-zA-Z0-9.!#$%&amp;’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)+$';

export default {
  name: 'ZInput',
  components: { ZLabel, ZIcon, ZButton, ZTooltip },
  props: {
    name: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: '',
    },
    caption: {
      type: String,
      default: '',
    },
    placeholder: {
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
    error: {
      type: Boolean,
      default: false,
    },
    success: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: String,
      default: '',
    },
    transparent: {
      type: Boolean,
      default: false,
    },
    submitButton: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    pattern: {
      type: String,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    copyable: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [Number, String],
      default: null,
    },
    copyConfirmationText: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      invalid: false,
      validationMessage: '',
      lastInvalidValue: null,
      focused: false,
    };
  },
  computed: {
    classes() {
      const classes = [];
      if (this.disabled) classes.push('z-input--disabled');
      if (this.valid) classes.push('z-input--valid');
      if (this.invalid) classes.push('z-input--invalid');
      if (this.error) classes.push('z-input--error');
      if (this.transparent) classes.push('z-input--transparent');
      if (this.submitButton) classes.push('z-input--submit-button');
      if (this.readonly) classes.push('z-input--readonly');
      return classes;
    },
    style() {
      const style = {};
      const step = getCssVar('--step', 8);
      const widthStr = this.width
        ? hasUnits(this.width)
          ? this.width
          : `${this.width * step}px`
        : null;
      if (widthStr) {
        style.maxWidth = widthStr;
      }
      return style;
    },
    iconWithin() {
      return this.copyable;
    },
    inputClasses() {
      const classes = [];
      if (this.focused) classes.push('z-input__input--focused');
      if (this.iconWithin) classes.push('z-input__input--icon-within');
      if (this.color) classes.push('border--' + this.color);
      return classes;
    },
    valueProxy: {
      get() {
        return this.value;
      },
      set(value) {
        if (value !== this.lastInvalidValue) {
          this.invalid = false;
          this.validationMessage = '';
        }
        this.$emit('input', value);
      },
    },
    validationPattern() {
      return this.pattern || this.type === 'email' ? emailPattern : null;
    },
    inputMessage() {
      return this.validationMessage || this.message;
    },
  },
  methods: {
    focus() {
      this.$refs.input && this.$refs.input.focus();
    },
    onInvalid(e) {
      this.invalid = true;
      this.lastInvalidValue = this.value;
      this.validationMessage = e.target.validationMessage;
    },
    onClickIconWithin() {
      if (this.copyable) {
        this.$refs.input && this.$refs.input.select();
        document.execCommand('copy');
      }
    },
  },
};
</script>
