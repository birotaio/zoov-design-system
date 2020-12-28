<template lang="pug">
  component.z-link(:is="component" :class="classes" :hreflang="hreflang" v-bind="props")
    slot
</template>

<style lang="stylus">
@import '../../styles/components.styl';

a[href].z-link
  text-decoration none

  &.z-link--inline
    color: $colors.primary.base
    position relative
    display inline-block

    &::after
      content ''
      display block
      position absolute
      bottom 1px
      width 100%
      height 1px
      background-color: $colors.primary.base
      transition transform 0.2s ease

    &:hover::after
      transform translateY(2px)
      transition transform 0.5s ease
</style>

<script>
export default {
  name: 'ZLink',
  props: {
    to: {
      type: [Object, String],
      default: null,
    },
    href: {
      type: String,
      default: null,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    hreflang: {
      type: String,
      default: null,
    },
  },
  computed: {
    isNuxtLink() {
      return this.to && this.$nuxt;
    },
    isRouterLink() {
      return this.to && this.$router;
    },
    component() {
      return this.isNuxtLink
        ? 'nuxt-link'
        : this.isRouterLink
        ? 'router-link'
        : 'a';
    },
    props() {
      return this.isNuxtLink || this.isRouterLink
        ? {
            to: this.to,
            activeClass: 'z-link--active',
            exactActiveClass: 'z-link--exact-active',
          }
        : { href: this.computedHref };
    },
    computedHref() {
      return this.to
        ? typeof this.to === 'string'
          ? this.to
          : this.to.path
        : this.href;
    },
    classes() {
      const classes = [];
      if (this.inline) classes.push('z-link--inline');
      return classes;
    },
  },
};
</script>
