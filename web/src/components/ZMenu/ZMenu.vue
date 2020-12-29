<template lang="pug">
  .z-menu(@mouseleave.stop="onLeaveActivator" :class="{ 'z-menu--hover': hover }")
    component.z-menu__activator(
      :tabindex="focusable ? '0' : null"
      :is="!mounted && noscriptHref ? 'a' : 'label'"
      :href="!mounted && noscriptHref"
      @click.stop.prevent="onClickActivator"
      @focus.stop="onFocusActivator"
      @blur.stop="onBlurActivator"
      @mouseenter.stop="onEnterActivator"
    )
      slot(
        name="activator"
        :activate="onClickActivator"
        :focus="onFocusActivator"
        :blur="onBlurActivator"
      )
    transition(name="zt-fade")
      .z-menu__content(v-if="proxy__value" ref="content" :class="classes")
        z-card.elevation-4(dense)
          slot
</template>

<style lang="stylus">
@import '../../styles/components.styl';

.no-script .z-menu__activator
  cursor pointer

.z-menu
  display inline-block
  position relative
  z-index 1

  &:not(.z-menu--hover)
    .z-menu__activator
      cursor pointer

  &__activator
    cursor default
    display inline

    &:focus
      outline 0

  &__content
    min-width size(20)
    position absolute
    z-index 1

    .z-card
      margin-top size(0.5)

    &--fixed
      position fixed

    &--top
      bottom calc(100% - 4px)

      .z-card
        margin-top 0

    &--left
      left 0

    &--right
      right 0

    &--bottom
      bottom -100%
</style>

<script>
import ZCard from '../../components/ZCard';
import proxy from '../../mixins/proxy';
import { isClient } from '../../modules/utils';

// cannot be used in SSR
if (isClient) require('element-closest-polyfill');

export default {
  name: 'ZMenu',
  components: { ZCard },
  mixins: [proxy('value')],
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    top: {
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
    bottom: {
      type: Boolean,
      default: false,
    },
    hover: {
      type: Boolean,
      default: false,
    },
    fixed: {
      type: Boolean,
      default: false,
    },
    focusable: {
      type: Boolean,
      default: false,
    },
    // used in ssr
    noscriptHref: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      mounted: false,
      focused: false,
    };
  },
  mounted() {
    this.mounted = true;
  },
  computed: {
    classes() {
      const classes = [];
      ['top', 'left', 'right', 'bottom'].forEach(position => {
        if (this[position]) classes.push('z-menu__content--' + position);
      });
      if (this.fixed) classes.push('z-menu__content--fixed');
      return classes;
    },
  },
  methods: {
    hasFocusedChildren() {
      return new Promise(resolve => {
        setTimeout(() => {
          let focusedChildren = [];
          try {
            if (isClient) {
              focusedChildren = this.$refs.content
                ? this.$refs.content.querySelectorAll(':focus')
                : [];
            }
          } catch (e) {
            /* nothing */
          }
          resolve(!!focusedChildren.length);
        }, 0);
      });
    },
    onClickActivator() {
      if (this.focused) return;
      if (!this.hover) this.proxy__value = !this.proxy__value;
    },
    onClickWindow(e) {
      if (!e.target.closest('.z-menu__content')) {
        this.proxy__value = false;
      }
    },
    onEnterActivator() {
      if (this.hover) this.proxy__value = true;
    },
    onLeaveActivator() {
      if (this.hover) this.proxy__value = false;
    },
    onFocusActivator() {
      this.focused = true;
      this.proxy__value = true;
    },
    async onBlurActivator() {
      this.focused = false;
      const hasFocusedChildren = await this.hasFocusedChildren();
      if (!hasFocusedChildren) this.proxy__value = false;
      else {
        let watcher = setInterval(async () => {
          const stillFocusedChildren = await this.hasFocusedChildren();
          if (!stillFocusedChildren) {
            this.proxy__value = false;
            clearInterval(watcher);
          }
        }, 500);
      }
    },
  },
  watch: {
    proxy__value(newVal) {
      if (isClient) {
        if (newVal) {
          window.addEventListener('click', this.onClickWindow);
        } else {
          window.removeEventListener('click', this.onClickWindow);
        }
      }
    },
  },
};
</script>
