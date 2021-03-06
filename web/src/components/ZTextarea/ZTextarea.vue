<template lang="pug">
.z-textarea
  .z-textarea__label(v-if="label")
    z-label {{ label }}
  .z-textarea__caption(v-if="caption")
    small(v-html="caption")
  textarea.z-textarea__textarea(
    :name="name"
    :placeholder="placeholder"
    :disabled="disabled"
    :required="required"
    :readonly="readonly"
    :class="textareaClasses"
    v-model="proxy__value"
    v-bind="textareaAttrs"
    @invalid.prevent="onInvalid"
    @focus="focused = true"
    @blur="focused = false"
  )
  transition(name="zt-fade")
    .z-textarea__message(
      v-if="textareaMessage"
      v-html="textareaMessage"
      :class="{ 'z-textarea__message--error' : validationMessage }"
    )
</template>

<style lang="stylus">
@import '../../styles/components.styl'

.z-textarea
  display flex
  flex-direction column
  padding size(1) 0
  width 100%

  .z-textarea__label
    display flex
    justify-content space-between
    margin-bottom size(1)

  .z-textarea__caption
    color: $colors.neutral.base

  .z-textarea__message
    font-size size(1.5)
    line-height size(2)
    overflow visible
    height 0

    &--error
      color: $colors.danger.base

  > .z-textarea__textarea
    margin size(.5) 0
    padding size(1) size(2)
    color: $colors.neutral.dark-3
    border: 1px solid $colors.neutral.light-3
    background white
    border-radius size(0.5)
    outline none
    transition border 0.2s ease

    &::placeholder
      color: $colors.neutral.dark-1

    &:disabled
      cursor not-allowed
      background: $colors.neutral.light-4

    &--focused
      border: 1px solid $colors.neutral.base
</style>

<script>
import ZLabel from '../../components/ZLabel';
import proxy from '../../mixins/proxy';

export default {
  name: 'ZTextarea',
  components: { ZLabel },
  mixins: [
    proxy('value', 'input', function(value) {
      if (value !== this.lastInvalidValue) {
        this.invalid = false;
        this.validationMessage = '';
      }
      return value;
    }),
  ],
  props: {
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
    message: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    // additional native textarea attributes
    textareaAttrs: {
      type: Object,
      default: () => ({}),
    },
    // any type
    value: null,
  },
  data() {
    return {
      openMenu: false,
      focused: false,
      invalid: false,
      validationMessage: '',
      lastInvalidValue: null,
    };
  },
  computed: {
    textareaMessage() {
      return this.validationMessage || this.message;
    },
    textareaClasses() {
      const classes = [];
      if (this.color) classes.push('border--' + this.color);
      if (this.invalid) classes.push('border--danger');
      if (this.focused) classes.push('z-textarea__textarea--focused');
      return classes;
    },
  },
  methods: {
    onInvalid(e) {
      this.invalid = true;
      this.lastInvalidValue = this.value;
      this.validationMessage = e.target.validationMessage;
    },
  },
};
</script>
