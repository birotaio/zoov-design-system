<template lang="pug">
  component.z-button(
    ref="button"
    :is="(to || href) && !submit ? 'z-link' : 'button'"
    :to="to"
    :href="href"
    :target="target"
    :rel="rel"
    :class="classes"
    :prevent="prevent"
    v-bind="href ? {} : { type: submit && !loading && !disabled ? 'submit' : 'button' }"
    @focus.stop="$emit('focus')"
    @blur.stop="$emit('blur')"
    @keydown.enter.space.stop="onClick($event, false)"
    @click.stop="onClick($event, true)"
  )
    z-loader.z-button__loader(
      v-if="loading"
      :size="2"
      :color="textColor || (darkText ? 'neutral--dark-3' : 'white')"
    )
    .z-button__ripple(:class="hoverColor")
    .z-button__content(:style="{ opacity: ~~!loading }")
      slot
</template>

<style lang="stylus">
@import '../../styles/components.styl';

$ease-ripple-in := cubic-bezier(0.56, 0, 0.84, 0.17);
$ease-ripple-out := cubic-bezier(0.17, 0.84, 0.44, 1.00);

.z-button, a.z-button
  typography('button')
  bg-color($colors.neutral.dark-3)
  text-color($colors.white.base)
  transition background-color $background-duration
  display inline-block
  text-transform uppercase
  text-decoration none
  vertical-align middle
  user-select none
  outline 0
  border 0

  display inline-flex
  justify-content center
  vertical-align middle
  white-space nowrap
  align-items center
  line-height 1
  position relative

  &:hover
    text-color($colors.white.base)

  &.z-button--loading
    cursor progress

  &.z-button--disabled
    cursor default
    bg-color(alpha($colors.neutral.dark-3, 15%), true)
    text-color($colors.neutral.base, true)

  &.z-button--prevent-click
    cursor default

  &:not(.z-button--loading):not(.z-button--disabled):not(.z-button--icon):not(.z-button--prevent-click):not(.z-button--shapeless)
    make-interactive()
    cursor pointer

  .z-button__ripple
    background-color $focus-background
    position absolute
    width 100%
    height 100%
    border-radius 50%
    z-index 0
    transform scale(0)
    transition transform 0.1s $ease-ripple-in, background-color 0.2s

  .z-button__loader
    position absolute

  .z-button__content
    height 100%
    display flex
    justify-content center
    vertical-align middle
    white-space nowrap
    align-items center
    line-height 1
    z-index 1

  &.z-button--dark-text
    text-color($colors.neutral.dark-3)

  &.z-button--outline, &.z-button--ghost
    bg-color(transparent)
    text-color($colors.neutral.dark-3)

    &:not(.z-button--loading):not(.z-button--disabled):not(.z-button--icon):not(.z-button--prevent-click):not(.z-button--shapeless)
      &:hover
        background-image linear-gradient($focus-background, $focus-background)

      &:active
        background-image linear-gradient($active-background, $active-background)

  &.z-button--outline
    border: 1px solid $colors.neutral.dark-3

  rounded-lr(5)

  &.z-button--left
    margin-left -1 * size(2.5)

  &.z-button--right
    margin-right -1 * size(2.5)

  // icon inside
  .z-icon
    square(3)

  // icon positionning
  &:not(.z-button--icon)
    .z-icon
      &:first-child
        margin-left -1 * size(0.5)
        margin-right size(1)

      &:last-child
        margin-right -1 * size(0.5)
        margin-left size(1)

  // sizes (with icon inside)
  &.z-button--giant
    rounded-lr(7)
    font-size size(2.5)

    .z-icon
      square(3.5)

    &:not(.z-button--icon)
      .z-icon
        &:first-child
          margin-left -1 * size(1)
          margin-right size(1.25)

        &:last-child
          margin-right -1 * size(1)
          margin-left size(1.25)

    &.z-button--left
      margin-left -1 * size(3.5)

    &.z-button--right
      margin-right -1 * size(3.5)

  &.z-button--large
    rounded-lr(6)
    font-size size(2.25)

    .z-icon
      square(3.25)

    &.z-button--left
      margin-left -1 * size(3)

    &.z-button--right
      margin-right -1 * size(3)

  &.z-button--small
    rounded-lr(4)
    font-size size(1.5)

    .z-icon
      square(2.5)

    &:not(.z-button--icon)
      .z-icon
        &:first-child
          margin-left -1 * size(0.25)
          margin-right size(0.75)

        &:last-child
          margin-right -1 * size(0.25)
          margin-left size(0.75)

    &.z-button--left
      margin-left -1 * size(2)

    &.z-button--right
      margin-right -1 * size(2)

  &.z-button--tiny
    rounded-lr(3)
    font-size size(1.5)

    .z-icon
      square(2)

    &:not(.z-button--icon)
      .z-icon
        &:first-child
          margin-left -1 * size(0.25)
          margin-right size(0.5)

        &:last-child
          margin-right -1 * size(0.25)
          margin-left size(0.5)

  &.z-button--icon
    padding 0
    width size(5)

    &.z-button--giant
      width size(7)

    &.z-button--large
      width size(6)

    &.z-button--small
      width size(4)

    &.z-button--tiny
      width size(3)

    &:hover, &:focus
      .z-button__ripple
        transform scale(1)
        transition transform 0.25s $ease-ripple-out, background-color 0.2s

    &:active
      .z-button__ripple
        background-color $active-background

  &:focus
    outline 0
</style>

<script>
import ZLink from '../../components/ZLink';
import ZLoader from '../../components/ZLoader';

const sizes = ['giant', 'large', 'small', 'tiny'];

export default {
  name: 'ZButton',
  components: { ZLink, ZLoader },
  props: {
    color: {
      type: String,
      default: '',
    },
    hoverColor: {
      type: String,
      default: null,
    },
    tiny: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
    giant: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Boolean,
      default: false,
    },
    outline: {
      type: Boolean,
      default: false,
    },
    ghost: {
      type: Boolean,
      default: false,
    },
    darkText: {
      type: Boolean,
      default: false,
    },
    textColor: {
      type: String,
      default: null,
    },
    submit: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    preventClick: {
      type: Boolean,
      default: false,
    },
    href: {
      type: String,
      default: null,
    },
    to: {
      type: String,
      default: null,
    },
    target: {
      type: String,
      default: null,
    },
    rel: {
      type: String,
      default: null,
    },
    preventBlurOnClick: {
      type: Boolean,
      default: false,
    },
    left: {
      type: Boolean,
      default: false,
    },
    right: {
      type: Boolean,
      default: false,
    },
    shapeless: {
      type: Boolean,
      default: false,
    },
    prevent: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      const classes = [];
      // color (depends on style )
      if (this.color) {
        if (!this.outline && !this.ghost) {
          classes.push(this.color);
          // auto dark color
          if (/--light/.test(this.color)) classes.push('z-button--dark-text');
        } else {
          classes.push('text--' + this.color);
        }
        if (this.outline) classes.push('border--' + this.color);
      }
      if (this.darkText) classes.push('z-button--dark-text');
      // size
      let name;
      sizes.some(size => {
        if (this[size]) name = size;
        return this[size];
      });
      if (name) classes.push('z-button--' + name);
      // shape
      if (this.icon) classes.push('z-button--icon');
      // style
      if (this.outline) classes.push('z-button--outline');
      if (this.ghost) classes.push('z-button--ghost');
      if (this.submit) classes.push('z-button--submit');
      if (this.loading) classes.push('z-button--loading');
      if (this.disabled) classes.push('z-button--disabled');
      if (this.preventClick) classes.push('z-button--prevent-click');
      if (this.left) classes.push('z-button--left');
      if (this.right) classes.push('z-button--right');
      if (this.shapeless) classes.push('z-button--shapeless');
      if (this.textColor) classes.push('text--' + this.textColor);

      return [...new Set(classes)];
    },
  },
  methods: {
    onClick(e, blur) {
      if (blur && !this.preventBlurOnClick) {
        this.$refs.button &&
          this.$refs.button.tagName === 'BUTTON' &&
          this.$refs.button.blur();
      }
      if (!this.href && !this.submit) e.preventDefault();
      if (!this.loading && !this.disabled && !this.preventClick) {
        this.$emit('click', e);
      }
    },
  },
};
</script>
