<template lang="pug">
.z-select
  .z-select__label(v-if="label")
    z-label {{ label }}
  .z-select__value(
    @click="openMenu = !openMenu"
    :class="{ 'z-select__value--invalid': invalid }"
  )
    input(
      ref="select"
      type="text"
      aria-readonly="false"
      autocomplete="off"
      v-bind="selectAttrs"
      v-model="proxy__value"
      :placeholder="placeholder"
      :required="required"
      @input="proxy__value = lastOptionSelected"
      @invalid.prevent="onInvalid"
      @focus="inputFocus = true"
      @blur="inputFocus = false"
    )
    .z-select__arrows
      z-icon(:size="2") chevron-up
      z-icon(:size="2") chevron-down

  ul.z-select__options.elevation-4(
    :class="{ 'z-select__options--active': openMenu }"
  )
    li.z-select__option(
      v-for="(option, index) in options"
      @mouseover="listFocus = true; hoverIndex = index"
      @mouseout="listFocus = false; hoverIndex = null"
      @click="proxy__value = option; lastOptionSelected = option; openMenu = false"
      :class="{ 'z-select__option--hover': hoverIndex === index, 'z-select__option--active': proxy__value === option }"
    ) {{ option }}

  transition(name="zt-fade")
    .z-select__message(
      v-if="selectMessage"
      v-html="selectMessage"
      :class="{ 'z-select__message--error' : validationMessage }"
    )
</template>

<style lang="stylus">
@import '../../styles/components.styl'

.z-select
  width 100%
  position relative
  padding size(1) 0

  .z-select__label
    display flex
    justify-content space-between
    align-items baseline
    margin-bottom size(1)

    .z-label
      cursor pointer

  .z-select__message
    font-size size(1.5)
    line-height size(2)
    overflow visible
    height 0

    &--error
      color: $colors.danger.base

  .z-select__value
    height size(6)
    position relative
    background white
    border-radius size(0.5)
    display flex
    align-items center
    margin size(0.5) 0
    border: 1px solid $colors.neutral.light-3
    transition border 0.2s ease

    &--invalid
      border 1px solid $colors.danger.base

    > input
      padding-left size(2)
      width 100%
      height 100%
      cursor default !important
      caret-color transparent

      &::placeholder
        color: $colors.neutral.dark-1

      &:hover
        cursor auto

      &:focus
        outline none

    input.placeholder
      color: $colors.neutral.base

  .z-select__arrows
    position absolute
    flex-direction column
    display flex
    right size(2)

  .z-select__options
    width 100%
    z-index 1000
    margin-top size(1)
    list-style-type none
    margin-left 0
    border-radius size(0.5)
    opacity 0
    pointer-events none
    overflow hidden
    position absolute
    transition opacity 0.1s linear

    &--active
      opacity 1
      pointer-events auto

    .z-select__option
      background white
      height size(6)
      display flex
      align-items center
      padding size(2) 0 size(2) size(2)

      &--active
        font-weight bold

      &--hover
        background: $colors.primary.light-2
</style>

<script>
import ZLabel from '../../components/ZLabel';
import ZIcon from '../../components/ZIcon';
import proxy from '../../mixins/proxy';

export default {
  name: 'ZSelect',
  components: { ZLabel, ZIcon },
  mixins: [
    proxy('value', 'input', function(value) {
      if (value) {
        this.invalid = false;
        this.validationMessage = '';
      }
      return value;
    }),
  ],
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    message: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    // additional native select attributes
    selectAttrs: {
      type: Object,
      default: () => ({}),
    },
    // any type
    value: null,
  },
  data() {
    return {
      lastOptionSelected: '',
      validationMessage: '',
      openMenu: false,
      inputFocus: false,
      listFocus: false,
      invalid: false,
      hoverIndex: this.value ? this.options.indexOf(this.value) : 0,
    };
  },
  computed: {
    selectMessage() {
      return this.validationMessage || this.message;
    },
  },
  mounted() {
    if (!this.value && !this.placeholder) this.proxy__value = this.options[0];
    window.addEventListener('keydown', this.handleKeys);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeys);
  },
  methods: {
    onInvalid(e) {
      this.invalid = true;
      this.validationMessage = e.target.validationMessage;
    },
    handleKeys(e) {
      if (this.openMenu) {
        if (['ArrowUp', 'ArrowDown', 'Space'].indexOf(e.code) > -1) {
          e.preventDefault();
        }
        switch (e.code) {
          case 'ArrowDown':
            if (this.hoverIndex === null) {
              this.hoverIndex = 0;
            } else if (this.hoverIndex < this.options.length - 1) {
              this.hoverIndex++;
            }
            break;
          case 'ArrowUp':
            if (this.hoverIndex === null) {
              this.hoverIndex = this.options.length - 1;
            } else if (this.hoverIndex > 0) {
              this.hoverIndex--;
            }
            break;
          case 'Escape':
            this.openMenu = false;
            break;
          case 'Enter':
          case 'Space':
            this.proxy__value = this.options[this.hoverIndex];
            this.openMenu = false;
        }
      } else if (
        (e.code === 'Enter' || e.code === 'Space') &&
        this.inputFocus
      ) {
        this.openMenu = true;
      }
    },
  },
  watch: {
    inputFocus(value) {
      if (!value && !this.listFocus) this.openMenu = false;
    },
    openMenu(value) {
      if (!value) this.hoverIndex = this.options.indexOf(this.value);
    },
  },
};
</script>
