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
    .z-website-nav__container(:class="navContentClass")
      .spacer.sm-and-down

      .z-website-nav__logo__content
        z-link.z-website-nav__logo__wrapper(:href="logoHref")
          z-logo.z-website-nav__logo.z-website-nav__logo--desktop(
            :class="{ 'z-website-nav__logo--by-fifteen': logoByFifteen }"
            :outline="!logoByFifteen"
            :slanted="!breadcrumb && !logoByFifteen"
            :by-fifteen="logoByFifteen"
            width="84px"
            :color="logoColor"
          )
          z-logo.z-website-nav__logo.z-website-nav__logo--mobile(
            :class="{ 'z-website-nav__logo--by-fifteen': logoByFifteen }"
            :outline="!logoByFifteen"
            :slanted="!breadcrumb && !logoByFifteen"
            :by-fifteen="logoByFifteen"
            :width="logoByFifteen ? '72px' : '56px'"
            :color="logoColor"
          )
        z-divider.z-website-nav__separator(
          v-if="breadcrumb"
          vertical
          :light="faded && !mobileMenuOpen"
          :height="4"
        )
        z-link.z-website-nav__breadcrumb(
          v-if="breadcrumb"
          :to="breadcrumb.to"
          :href="breadcrumb.href"
          :class="[{ 'z-website-nav__breadcrumb--by-fifteen': logoByFifteen }, faded && fadedLinkHoverColor ? 'text--' + fadedLinkHoverColor + '--hover' : '']"
        )
          | {{ breadcrumb.text }}

        .z-website-nav__logo__mask

      .spacer

      .z-website-nav__links.sm-and-up
        slot(name="links-prepend")

        template(v-for="(item, i) in items")
          z-link(
            v-if="!item.group"
            :key="'link-' + i"
            :href="item.href"
            :to="item.to"
            :class="faded && fadedLinkHoverColor ? 'text--' + fadedLinkHoverColor + '--hover' : ''"
            v-show="!item.desktopHideWidth || $zds.clientWidth >= item.desktopHideWidth"
          )
            h6.z-website-nav__link {{ item.text }}

          z-menu.z-website-nav__link.z-website-nav__link--group(
            v-else
            :key="'group-' + i"
            :noscript-href="item.noscriptHref"
            focusable
            hover
            v-bind="item.menuProps"
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

      .z-website-nav__tools.sm-and-up
        template(v-if="searchButton")
          z-divider(
            vertical
            :light="faded"
            :height="4"
          )
          z-button.ml-1(
            icon
            ghost
            @click="$emit('click-search')"
          )
            z-icon(:color="faded ? 'white' : ''") search

        z-lang-picker.z-website-nav__link(
          v-if="langItems"
          :class="cta ? 'mr-4' : 'mr-1'"
          :lang="lang"
          :items="langItems"
          :right="langMenuRight"
          hover
        )

        slot(name="lang-append")

        template(v-if="cta")
          z-button(
            v-if="!cta.component"
            :color="faded && cta.fadedColor || cta.color || 'primary'"
            :text-color="faded && cta.fadedTextColor || cta.textColor"
            @click="$emit('click-cta')"
            :prevent="cta.prevent"
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

    .z-website-nav__container--mobile(:class="mobileClass")
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
          :color="faded && cta.fadedColor || cta.color || 'primary'"
          :text-color="faded && cta.fadedTextColor || cta.textColor"
          @click="$emit('click-cta')"
          :prevent="cta.prevent"
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

.z-website-nav__container
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
    .z-website-nav__container
      background-color transparent
      color white

    .z-website-nav__logo__content
      background-color transparent
      transition background-color 0s 0s

    .z-website-nav__logo__mask
      opacity 0
      transition-delay 0s

  for $breakpoint_name in $breakpoints
    .z-website-nav--faded--{$breakpoint_name}
      +media-down($breakpoint_name)
        .z-website-nav__container
          background-color transparent
          color white

        .z-website-nav__logo__content
          background-color transparent
          transition background-color 0s 0s

        .z-website-nav__logo__mask
          transition opacity 0s 0s
          opacity 0

      +media-up($breakpoint_name)
        .z-website-nav__logo__content
          transition background-color 0.1s 0.2s

        .z-website-nav__logo__mask
          opacity 0
          animation mask-on 0.3s 0.2s forwards

@keyframes mask-on
  100%
    opacity 1

.z-button.z-website-nav__burger
  position absolute
  left size(1)
  top size(1)
  z-index 2

.no-script
  .z-button.z-website-nav__burger:focus + .z-website-nav__container + .z-website-nav__container--mobile, .z-website-nav__container--mobile:hover
    display block

    .z-website-nav__link
      opacity 1
      transform translateX(0)

    .z-website-nav__button--mobile
      transform scale(1)

.z-website-nav__logo__content
  display flex
  align-items center
  position absolute
  height 100%
  background-color white
  transition background-color 0.1s 0.2s
  z-index 1

  +media-down('sm')
    background-color transparent

.z-website-nav__logo__wrapper, .z-website-nav__logo
  z-index 2

.z-website-nav__logo,
.z-website-nav__breadcrumb
  margin size(1)

.z-website-nav__logo--by-fifteen
  margin-top size(2)

.z-website-nav__breadcrumb--by-fifteen
  margin-bottom size(1.5)

.z-website-nav
  .z-website-nav__breadcrumb
    font-size size(3)

    +media-down('sm')
      font-size size(2.5)

.z-website-nav__logo--mobile
  display none

.z-website-nav__logo__mask
  width size(6)
  min-width size(6)
  height 100%
  background-image linear-gradient(90deg, white 50%, transparent 100%)
  z-index 1
  margin-right size(-4)
  opacity 1
  transition-delay 0.3s

  +media-down('sm')
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

.z-website-nav__container--mobile
  background-color white
  padding size(2) size(3)
  display none

  .z-website-nav__link
    opacity 0
    transform translateX($appear-right-distance)
    transition opacity $duration-1 $easing-2, transform $duration-1 $easing-2

  .z-website-nav__button--mobile
    transform scale(0)
    transition transform $duration-1 $easing-1 !important
    transition-delay 0.4s

.z-website-nav__tools
  display flex
  align-items center

.z-website-nav__links
  display flex
  align-items center
  justify-content flex-end
  padding-left size(1)
  padding-right size(2)
  height 100%

  a
    text-decoration none

.z-website-nav
  .z-website-nav__link--group
    h6.z-website-nav__link
      margin-left 0
      margin-right 0

      &:hover
        color: $colors.primary.base
        transition color 0.2s ease

.z-website-nav
  .z-website-nav__link, h6.z-website-nav__link
    margin 0 size(2)
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

    .z-website-nav__link, h6.z-website-nav__link
      margin-left 0
      margin-bottom size(2)

  .z-website-nav__logo__content
    position static

  .z-website-nav__logo--mobile
    display flex

  .z-website-nav__logo--desktop
    display none

  .z-website-nav__container
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
    fadedLinkHoverColor: {
      type: String,
      default: null,
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
    logoByFifteen: {
      type: Boolean,
      default: false,
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
    // Prepare fade mode by making it always true regardless breakpoint
    // so that in SSR the shipped navbar is consistent with no-script mode
    this.faded = !!this.fade;
  },
  mounted() {
    this.supportsSticky = supports.sticky();
    // Fade mode
    if (this.fade) {
      // Adjust fade when mounted (breakpoint is set front-side)
      this.setFadeOn();
      // fade-in on scroll mode
      window.addEventListener('scroll', this.onScroll, { passive: true });
      // and watch resize to adjust dynamic breakpoint fade mode
      window.addEventListener('resize', this.onResize);
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  },
  computed: {
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
    setFadeOn() {
      if (typeof this.fade === 'string') {
        this.faded = this.$zds.breakpoint[this.fade];
      } else {
        this.faded = !!this.fade;
      }
    },
    onScroll() {
      if (window.scrollY > 0) this.faded = false;
      else this.setFadeOn();
    },
    onResize() {
      // Call the same handler
      this.onScroll();
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
