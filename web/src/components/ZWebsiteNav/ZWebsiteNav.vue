<template lang="pug">
.z-website-nav__wrapper(:style="navWrapperStyle")
  .z-website-nav(:class="classes")
    .z-website-nav__curtain(:class="curtainClass")
    z-button.z-website-nav__burger.sm-and-down(
      icon
      ghost
      large
      @click="onClickBurger"
      :prevent-click="mobileMenuAnimating"
    )
      z-icon(:color="burgerColor") {{ mobileMenuIcon }}
    .z-website-nav__content(:class="navContentClass")
      .spacer.sm-and-down

      .z-website-nav__logo__content
        z-link.z-website-nav__logo__wrapper(:href="logoHref")
          z-logo.z-website-nav__logo.z-website-nav__logo--desktop(
            outline
            :slanted="!breadcrumb"
            width="84px"
            :color="logoColor"
          )
          z-logo.z-website-nav__logo.z-website-nav__logo--mobile(
            outline
            :slanted="!breadcrumb"
            width="56px"
            :color="logoColor"
          )
        z-divider.z-website-nav__separator(
          v-if="breadcrumb"
          vertical
          :height="4"
        )
        z-link.z-website-nav__logo.z-website-nav__breadcrumb(
          v-if="breadcrumb"
          :to="breadcrumb.to"
          :href="breadcrumb.href"
        )
          | {{ breadcrumb.text }}

      .spacer

      .z-website-nav__links.sm-and-up
        slot(name="links-prepend")

        template(v-for="(item, i) in items")
          z-link(
            v-if="!item.group"
            :key="'link-' + i"
            :href="item.href"
            :to="item.to"
          )
            h6.z-website-nav__link {{ item.text }}

          z-menu.z-website-nav__link.z-website-nav__link--group(
            v-else
            :key="'group-' + i"
            :noscript-href="item.noscriptHref"
            focusable
            hover
          )
            .z-website-nav__link__menu-activator(slot="activator")
              h6 {{ item.text }}
              z-icon(v-if="item.icon") {{ item.icon }}
              z-icon.ml-1(
                v-else
                :size="2"
              ) chevron-down

            template(v-for="(subItem, j) in item.group")
              z-divider.my-0(
                v-if="j > 0"
                :key="'divider-' + i + '-' + j"
              )
              z-link(
                :key="'link-' + i + '-' + j"
                :href="subItem.href"
                :to="subItem.to"
              )
                h6.z-website-nav__link {{ subItem.text }}

        slot(name="links-append")

        template(v-if="searchButton")
          z-divider(
            vertical
            :height="4"
          )
          z-button.ml-1.mr-2(
            icon
            ghost
            @click="$emit('click-search')"
          )
            z-icon search

        z-lang-picker.z-website-nav__link(
          v-if="langItems"
          :class="{ 'mr-1': !cta }"
          :lang="lang"
          :items="langItems"
          :right="langMenuRight"
          hover
        )

        slot(name="lang-append")

        template(v-if="cta")
          z-button(
            v-if="!cta.component"
            :color="cta.color || 'primary'"
            :href="cta.href"
            v-bind="cta.props"
            large
          )
            z-icon(v-if="cta.icon") {{ cta.icon }}
            span {{ cta.text }}
          component(
            v-else
            :is="cta.component"
            v-bind="cta.props"
          )

    .z-website-nav__content--mobile(:class="mobileClass")
      .z-website-nav__link(:style="transitionDelayStyle(-1)")
        slot(name="links-prepend")

      .z-website-nav__mobile-link(v-for="(item, i) in flattenItems")
        z-link(
          :key="'link-' + i"
          :href="item.href"
          :to="item.to"
          @click.native="onClickBurger"
        )
          h6.z-website-nav__link(:style="transitionDelayStyle(i)") {{ item.text }}

      .z-website-nav__link(:style="transitionDelayStyle(flattenItems.length)")
        slot(name="links-append")

      z-lang-picker.z-website-nav__link(
        v-if="langItems"
        :lang="lang"
        @click-item="onClickBurger()"
        :items="langItems"
        :style="transitionDelayStyle(flattenItems.length + 1)"
      )

      .z-website-nav__link(
        :style="transitionDelayStyle(flattenItems.length + 2)"
      )
        slot(name="lang-append")

      .z-website-nav__link(
        v-if="searchButton"
        :style="transitionDelayStyle(flattenItems.length + 3)"
      )
        z-divider
        z-button.ml-neg-1(
          icon
          ghost
          @click="$emit('click-search'); onClickBurger()"
        )
          z-icon search

      z-layout.py-2(
        v-if="cta"
        justify="center"
      )
        z-button.z-website-nav__button--mobile(
          v-if="!cta.component"
          :color="cta.color || 'primary'"
          :href="cta.href"
          v-bind="cta.props"
          large
        )
          z-icon(v-if="cta.icon") {{ cta.icon }}
          span {{ cta.text }}
        component(
          v-else
          :is="cta.component"
          v-bind="cta.props"
        )
</template>

<style lang="stylus">
@import '../../styles/components.styl'

$duration-1 ?= 0.5s
$duration-2 ?= 0.25s
$angle ?= -8deg
$appear-right-distance ?= 100px
$easing-1 ?= cubic-bezier(0.17, 0.84, 0.44, 1)
$easing-2 ?= cubic-bezier(0.32, 0.94, 0.6, 1)
$easing-3 ?= cubic-bezier(0.17, 0, 0.83, 1)
$easing-4 ?= cubic-bezier(0.76, 0, 0.24, 1)

.z-website-nav__wrapper
  position fixed
  z-index 9
  top 0
  left 0
  right 0

@supports (position sticky)
  .z-website-nav__wrapper
    position sticky

.z-website-nav
  position absolute
  width 100%

.z-website-nav--elevation.z-website-nav--not-faded, .no-script .z-website-nav--elevation.z-website-nav--faded
  elevation-shadow-light(3)

for $breakpoint_name in $breakpoints
  +media-down($breakpoint_name)
    .no-script .z-website-nav--elevation.z-website-nav--faded--{$breakpoint_name}
      elevation-shadow-light(3)

.z-website-nav__content
  height size(10)
  display flex
  background-color white
  align-items center
  padding 0 size(4)
  transition opacity 0.2s ease, background-color 0.3s !important

  .z-menu
    .z-website-nav__link
      padding size(2) 0
      color: $colors.neutral.dark-3

html:not(.no-script)
  .z-website-nav--faded
    .z-website-nav__content
      background-color transparent
      color white

  for $breakpoint_name in $breakpoints
    +media-down($breakpoint_name)
      .z-website-nav--faded--{$breakpoint_name}
        .z-website-nav__content
          background-color transparent
          color white

.z-button.z-website-nav__burger
  position absolute
  left size(1)
  top size(1)
  z-index 2

.no-script
  .z-button.z-website-nav__burger:focus + .z-website-nav__content + .z-website-nav__content--mobile, .z-website-nav__content--mobile:hover
    display block

    .z-website-nav__link
      opacity 1
      transform translateX(0)

    .z-website-nav__button--mobile
      transform scale(1)

.z-website-nav__logo__content
  display flex
  align-items center

.z-website-nav__logo__wrapper, .z-website-nav__logo
  z-index

.z-website-nav__logo
  margin size(1)

.z-website-nav
  .z-website-nav__breadcrumb
    font-size size(3)

.z-website-nav__logo--mobile
  display none

.z-website-nav__curtain
  position absolute
  z-index 2
  width 110%
  left -5%
  right -5%
  height 0
  background-color: $colors.secondary.base
  display none

  &--grow
    transform-origin 0 0
    animation slide-y $duration-1 $easing-4 forwards, skew-1 $duration-1 linear

  &--shrink
    height 100%
    bottom 0
    transform-origin 100% 0
    animation slide-y-reverse $duration-1 $easing-4 forwards, skew-2 $duration-1 linear

  &--reverse
    animation-direction reverse

.z-website-nav__content--mobile
  background-color white
  padding size(2) size(3)
  display none

  .z-website-nav__link
    margin-bottom size(2)
    opacity 0
    transform translateX($appear-right-distance)
    transition opacity $duration-1 $easing-2, transform $duration-1 $easing-2

  .z-website-nav__button--mobile
    transform scale(0)
    transition transform $duration-1 $easing-1 !important
    transition-delay 0.4s

.z-website-nav__links
  display flex
  align-items center

  a
    text-decoration none

.z-website-nav__link--group
  h6.z-website-nav__link
    margin-right 0

    &:hover
      color: $colors.primary.base
      transition color 0.2s ease

.z-website-nav
  .z-website-nav__link, h6.z-website-nav__link
    margin-right size(4)
    white-space nowrap
    position relative

    &--active
      &::after
        content ''
        display block
        rounded(0.75)
        background-color: $colors.primary.base
        position absolute
        left 50%
        bottom -10px
        transform translateX(-3px)

.z-website-nav__link__menu-activator
  display flex
  align-items center

+media-down('sm')
  .z-website-nav
    .z-website-nav__logo--blog
      font-size size(2)

  .z-website-nav__logo--mobile
    display flex

  .z-website-nav__logo--desktop
    display none

  .z-website-nav__content
    height size(8)
    padding 0 size(2)

  .z-website-nav__curtain
    display block

  .z-website-nav__content--mobile
    &--open
      display block
      opacity 0

    &--show
      display block
      opacity 1

      .z-website-nav__link
        opacity 1
        transform translateX(0)

      .z-website-nav__button--mobile
        transform scale(1)
        transition-delay 0.12s

@keyframes slide-y
  0%
    height 0

  100%
    height 100%
    // height calc(100% + (0.31 * 100vw))

@keyframes slide-y-reverse
  0%
    height 100%

  100%
    height 0

@keyframes skew-1
  0%
    transform skewY(0)

  50%
    transform skewY($angle)

  100%
    transform skewY(0)

@keyframes skew-2
  0%
    transform skewY(0)

  50%
    transform skewY($angle)

  100%
    transform skewY(0)
</style>

<script>
import ZLink from '../../components/ZLink';
import ZLangPicker from '../../components/ZLangPicker';
import { sleep, supports } from '../../modules/utils';

const menuDuration = 0.5 * 1000;

export default {
  name: 'ZWebsiteNav',
  components: { ZLink, ZLangPicker },
  props: {
    lang: {
      type: String,
      default: 'fr',
    },
    offsetTop: {
      type: Number,
      default: 0,
    },
    langItems: {
      type: Array,
      default: null,
    },
    langMenuRight: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => [],
    },
    cta: {
      type: Object,
      default: null,
    },
    fade: {
      type: [Boolean, String],
      default: false,
    },
    logoHref: {
      type: String,
      default: '/',
    },
    searchButton: {
      type: Boolean,
      default: false,
    },
    breadcrumb: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      navClass: 'z-website-nav--elevation',
      navContentClass: null,
      curtainClass: null,
      mobileClass: null,
      mobileMenuOpen: false,
      mobileMenuAnimating: false,
      mobileMenuIcon: 'hamburger',
      supportsSticky: false,
      faded: false,
    };
  },
  created() {
    // faded (to be handled server side too for no-script support)
    if (this.fade) this.faded = true;
  },
  mounted() {
    this.supportsSticky = supports.sticky();
    // fade-in on scroll mode
    if (this.fade) {
      window.addEventListener('scroll', this.onScroll, { passive: true });
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  computed: {
    sm() {
      return this.$zds.breakpoint.sm;
    },
    client() {
      return this.$zds.client;
    },
    navWrapperStyle() {
      if (!this.supportsSticky) {
        return { top: this.offsetTop + 'px' };
      } else {
        return {};
      }
    },
    flattenItems() {
      return this.items.reduce(
        (items, item) => items.concat(item.group || item),
        []
      );
    },
    fadeClass() {
      if (typeof this.fade === 'string') {
        return 'z-website-nav--faded--' + this.fade;
      } else {
        return 'z-website-nav--faded';
      }
    },
    classes() {
      const classes = [this.navClass];
      if (this.faded && !this.mobileMenuOpen) {
        classes.push(this.fadeClass);
      } else {
        classes.push('z-website-nav--not-faded');
      }
      return classes;
    },
    logoColor() {
      return this.faded && !this.mobileMenuOpen
        ? this.fade === true ||
          (typeof this.fade === 'string' && this.$zds.breakpoint[this.fade])
          ? 'white'
          : 'primary'
        : 'primary';
    },
    burgerColor() {
      return this.faded && !this.mobileMenuOpen
        ? this.fade === true ||
          (typeof this.fade === 'string' && this.$zds.breakpoint[this.fade])
          ? 'white'
          : ''
        : '';
    },
  },
  methods: {
    onScroll() {
      const rect = this.$el.getBoundingClientRect();
      if (rect.top > 0) {
        this.faded = true;
      } else {
        if (window.scrollY > 0) this.faded = false;
        else this.faded = true;
      }
    },
    async onClickBurger() {
      if (this.mobileMenuAnimating) return;
      // mobile animation
      if (!this.mobileMenuOpen) {
        this.mobileMenuAnimating = true;
        // open animation timeline
        this.navClass = 'overflow--hidden';
        this.navContentClass = !this.faded ? 'z-website-nav--elevation' : '';
        this.curtainClass = 'z-website-nav__curtain--grow';
        this.mobileClass = 'z-website-nav__content--mobile--open';
        setTimeout(() => (this.mobileMenuIcon = 'close'), 120);
        await sleep(menuDuration);
        this.navClass =
          'z-website-nav--elevation elevation-transition overflow--hidden';
        this.navContentClass = null;
        this.curtainClass = 'z-website-nav__curtain--shrink';
        this.mobileClass = 'z-website-nav__content--mobile--show';
        this.mobileMenuOpen = true;
        await sleep(menuDuration);
        this.curtainClass = null;
        this.navClass =
          'z-website-nav--elevation overflow--hidden elevation-transition';
        //
        this.mobileMenuAnimating = false;
        // reset overflow after a while
        await sleep(menuDuration);
        this.navClass = 'z-website-nav--elevation elevation-transition';
      } else {
        this.mobileMenuAnimating = true;
        // close animation timeline
        this.navClass =
          'z-website-nav--elevation elevation-transition overflow--hidden';
        this.curtainClass =
          'z-website-nav__curtain--shrink z-website-nav__curtain--reverse';
        await sleep(menuDuration);
        this.mobileClass = 'z-website-nav__content--mobile--open';
        this.curtainClass =
          'z-website-nav__curtain--grow z-website-nav__curtain--reverse';
        this.navContentClass = !this.faded ? 'z-website-nav--elevation' : '';
        this.navClass = 'overflow--hidden elevation-transition';
        this.mobileMenuOpen = false;
        setTimeout(() => (this.mobileMenuIcon = 'hamburger'), 380);
        await sleep(menuDuration);
        this.mobileClass = null;
        this.navClass =
          'z-website-nav--elevation overflow--hidden elevation-transition';
        this.curtainClass = null;
        //
        this.mobileMenuAnimating = false;
        // reset overflow after a while
        await sleep(menuDuration);
        this.navClass = 'z-website-nav--elevation elevation-transition';
      }
    },
    transitionDelayStyle(index) {
      return { 'transition-delay': index * 0.03 + 0.25 + 's' };
    },
  },
  watch: {
    // when fade prop change, update faded state
    fade() {
      if (this.fade) {
        this.faded = true;
        window.addEventListener('scroll', this.onScroll, { passive: true });
      } else {
        this.faded = false;
        window.removeEventListener('scroll', this.onScroll, { passive: true });
      }
    },
  },
};
</script>
