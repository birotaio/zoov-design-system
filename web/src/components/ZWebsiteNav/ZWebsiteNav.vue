<template lang="pug">
  .z-website-nav__wrapper(:style="navWrapperStyle")
    .z-website-nav.zds(:class="classes")
      .z-website-nav__curtain(:class="curtainClass")
      z-button.z-website-nav__burger.sm-and-down(
        icon ghost large
        @click="onClickBurger"
        :prevent-click="mobileMenuAnimating"
      )
        z-icon(:color="burgerColor") {{ mobileMenuIcon }}
      .z-website-nav__content(:class="navContentClass")
        .spacer.sm-and-down

        z-link.z-website-nav__logo__wrapper(:href="logoHref")
          z-logo.z-website-nav__logo.z-website-nav__logo--desktop(outline slanted width="84px" :color="logoColor")
          z-logo.z-website-nav__logo.z-website-nav__logo--mobile(outline slanted width="56px" :color="logoColor")

        .spacer

        .z-website-nav__links.sm-and-up
          template(v-for="(item, i) in items")
            z-link(
              v-if="!item.group"
              :key="'link-'+i"
              :href="item.href"
              :to="item.to"
            )
              h6.z-website-nav__link {{ item.text }}

            z-menu.z-website-nav__link.z-website-nav__link--group(
              v-else
              :key="'group-'+i"
              :noscript-href="item.noscriptHref"
              focusable
              hover
            )
              .z-website-nav__link__menu-activator(slot="activator")
                h6 {{ item.text }}
                z-icon.ml-1(:size="2") chevron-down

              template(v-for="(subItem, j) in item.group")
                z-divider.my-0(v-if="j > 0" :key="'divider-'+i+'-'+j")
                z-link(
                  :key="'link-'+i+'-'+j"
                  :href="subItem.href"
                  :to="subItem.to"
                )
                  h6.z-website-nav__link {{ subItem.text }}

          z-lang-picker.z-website-nav__link(
            v-if="langItems"
            :lang="lang"
            :items="langItems"
            hover
          )

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
            component(v-else :is="cta.component" v-bind="cta.props")

      .z-website-nav__content--mobile(:class="mobileClass")
        .z-website-nav__mobile-link(v-for="(item, i) in flattenItems")
          z-link(
            :key="'link-'+i"
            :href="item.href"
            :to="item.to"
          )
            h6.z-website-nav__link {{ item.text }}

        z-lang-picker.z-website-nav__link(
          v-if="langItems"
          :lang="lang"
          :items="langItems"
        )

        z-layout.py-2(v-if="cta" justify="center")
          z-button.z-website-nav__button--mobile(
            v-if="!cta.component"
            :color="cta.color || 'primary'"
            :href="cta.href"
            v-bind="cta.props"
            large
          )
            z-icon(v-if="cta.icon") {{ cta.icon }}
            span {{ cta.text }}
          component(v-else :is="cta.component" v-bind="cta.props")

</template>

<style lang="stylus">
@import '../../styles/components.styl';

$duration-1 := 0.5s
$duration-2 := 0.25s
$angle := -8deg
$appear-right-distance := 100px

$easing-1 := cubic-bezier(0.17, 0.84, 0.44, 1.00)
$easing-2 := cubic-bezier(0.32, 0.94, 0.60, 1.00)
$easing-3 := cubic-bezier(0.17, 0.00, 0.83, 1.00)
$easing-4 := cubic-bezier(0.76, 0.00, 0.24, 1.00)

.z-website-nav__wrapper
  position fixed
  z-index 9
  top 0
  left 0
  right 0

@supports (position: sticky)
  .z-website-nav__wrapper
    position sticky

.z-website-nav
  position absolute
  width 100%
  elevation-transition()

.z-website-nav--elevation.z-website-nav--not-faded,
.no-script .z-website-nav--elevation.z-website-nav--faded
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
  .z-button.z-website-nav__burger:focus + .z-website-nav__content + .z-website-nav__content--mobile,
  .z-website-nav__content--mobile:hover
    display block

    .z-website-nav__link
      opacity 1
      transform translateX(0)

    .z-website-nav__button--mobile
      transform scale(1)

.z-website-nav__logo__wrapper, .z-website-nav__logo
  z-index

.z-website-nav__logo--mobile
  display none

.z-website-nav__curtain
  position absolute
  z-index 2
  width 110%
  left -5%
  right -5%
  height 0%
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
  h6.z-website-nav__link:hover
    color: $colors.primary.base
    transition color 0.2s ease

.z-website-nav__link, .zds h6.z-website-nav__link
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

      for $n in 0 1 2 3 4
        .z-website-nav__mobile-link:nth-child({$n + 1})
          .z-website-nav__link
            $delay = $n * 0.03s + 0.25
            transition-delay $delay

        .z-lang-picker.z-website-nav__link
          $delay = 4 * 0.03s + 0.25
          transition-delay $delay


@keyframes slide-y
  0%
    height 0%

  100%
    height 100%
    // height calc(100% + (0.31 * 100vw))

@keyframes slide-y-reverse
  0%
    height 100%

  100%
    height 0%

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
        this.navClass = 'z-website-nav--elevation elevation-transition';
        //
        this.mobileMenuAnimating = false;
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
        this.navClass = 'overflow--hidden';
        this.mobileMenuOpen = false;
        setTimeout(() => (this.mobileMenuIcon = 'hamburger'), 380);
        await sleep(menuDuration);
        this.mobileClass = null;
        this.navClass = 'z-website-nav--elevation overflow--hidden';
        this.curtainClass = null;
        //
        this.mobileMenuAnimating = false;
      }
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
