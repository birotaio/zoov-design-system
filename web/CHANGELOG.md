# Changelog

## 0.7.1 (Sep 03, 2021)

### Fix

  * [Nav] Fix the flashing navbar on scroll (iOS)

## 0.7.0 (Sep 02, 2021)

### Feature

  * [Colors] Add `--hover` color classes helpers
  * [Nav] Add `fadedLinkHoverColor` prop

## 0.6.4 (Sep 02, 2021)

### Features

  * [Nav] Add colors support for nav CTA in faded mode
  * [Nav] Fix faded mode based on a breakpoint
  * [Icons] Add 'paperplane' and 'battery-big-swap' icons

## 0.6.3 (Sep 01, 2021)

### Feature

  * [Nav] Add text color support for nav CTA

## 0.6.2 (Jun 03, 2021)

### Fixes

  * [Component]
    - Add a condition to send a mail or display a form on click in the cta of ZWebsiteNav
    - Fix text style in ZSelect


## 0.6.1 (Jun 02, 2021)

### Fixes

  * [Component] ZSelect:
    - Fix margin and width
    - Add the right value when selecting an option with `enter`
    - Handle html content

## 0.6.0 (Jun 02, 2021)

### Features

  * [Nav] Handle new corpo form
  * [Components]
    - Add ZSelect component
    - Add ZTextarea component

## 0.5.10 (May 18, 2021)

### Feature

  * [Checkbox] Handle html content in label

## 0.5.9 (March 19, 2021)

### Feature

  * Add `desktopHideWidth` property to the nav elements

## 0.5.8 (February 25, 2021)

### Fix

  * Fix inconsistent breakpoint computation JS side vs CSS side
  * Fix transitional fade state on fade mode in sm breakpoint

## 0.5.7 (February 22, 2021)

### Feature

  * Add 4 icons to the design system

## 0.5.6 (February 17, 2021)

### Fix

  * Make sure Nav logo in perfectly centered in mobile

## 0.5.5 (February 9, 2021)

### Fix

  * Fix appearance & colors of Nav in faded mode

## 0.5.4 (February 4, 2021)

### Fix

  * Fix margin of nav language picker when no CTA

## 0.5.3 (February 3, 2021)

### Fix

  * Fix matching of icons (trim name)
  * Gracefully handle overflowing content in Nav Bar

## 0.5.2 (January 21, 2021)

### Fix

  * Fix ZTag color overriden by ZLink

## 0.5.1 (January 19, 2021)

### Fix

  * Fix ZTag color override

## 0.5.0 (January 19, 2021)

### Features

  * Allow binding additional menu properties to nav links group menu
  * Add caption styling for `figcaption` tag too
  * Add link props to ZTag to conditionnaly render ZLink with elevation on hover
  * Update ZTag default to size bigger and add a `small` prop to ZTag rendering the small version
  * Add `target` props to ZLink to handle `target="_blank"` attribute

## 0.4.10 (January 12, 2021)

### Feature

  * Close nav on click lang on mobile

## 0.4.9 (January 12, 2021)

### Feature

  * Add the management of a breadcrumb in the nav

## 0.4.8 (January 8, 2021)

### Feature

  * Close nav on click link and search on mobile

## 0.4.7 (January 7, 2021)

### Fix

  * Properly format mumeric lists (`<ol>`)

## 0.4.6 (January 6, 2021)

### Fix

  * Pass down `:key="data.key"` to functional components

## 0.4.5 (January 4, 2021)

### Feature

  * Define and use a simpler `typography` mixin

## 0.4.4 (January 4, 2021)

### Feature

  * Add `icon` option for nav link group

## 0.4.3 (January 4, 2021)

### Feature

  * Add "dots-three" icon

## 0.4.2 (December 31, 2020)

### Fix

  * Make sure link style is not overriden by .zds

## 0.4.1 (December 31, 2020)

### Fix

  * Fix margin of lang picker in ZWebsiteNav without CTA

## 0.4.0 (December 29, 2020)

### Features

  * Add slots to ZWebsiteNav, add `right` option for language menu, add `search-button` option
  * Add ZTag component
  * Read stylus color file and expose colors theme to JS $zds instance
  * Support for hreflang in ZLink and ZLangPicker
  * Update sandbox:
    - use colors from exposed theme
    - add background and text colors examples
    - update elevation example
    - update checkbox example
    - add ZLink example
    - add ZTag example
    - update ZWebsiteNav example search button

### Fix

  * Fix ZWebsiteNav behavior in mobile (overflow, elevation transition, transition delays)
  * Fix ZCheckbox style for white color
  * Fix sizes of icons in ZButtons

## 0.3.1 (December 15, 2020)

### Features

  * Update color design tokens: alt-blue -> tertiary, alt-purple -> quaternary
  * Add ZWebsiteNav component (based on corporate website component)
  * Add ZLangPicker component
  * Add ZLink component which contextually renders `nuxt-link`, `router-link` or `a`
  * Use ZLink component to wrap ZButton, add `to` option
  * Improve ZIcon component with flag & self-color options, add fr and en flag icons

## 0.2.16 (November 27, 2020)

### Fix

  * Fix catch statement without error that could not compile in old versions of webpack

## 0.2.15 (November 18, 2020)

### Features

  * Update bookmark icon and add bookmark-plus & bookmark-minus

## 0.2.14 (November 18, 2020)

### Features

  * Build lib for the browser
  * Add test html file to test built lib
  * Improve elevations with hover & focus modifiers
  * Add ZSpacer component (shorcuts .spacer class)
  * Add "vertical" option for ZDivider
  * Improve ZCard with header and footer slots

## 0.2.13 (October 6, 2020)

### Features

  * Add fill transition to ZLogo

## 0.2.12 (September 24, 2020)

### Fixes

  * Fix ZDrawer arrow direction

## 0.2.11 (September 24, 2020)

### Features

  * Update Sandbox: moved ZButton, add ZLoader
  * Add `absolute` position of ZDialog

### Fixes

  * Fix `top` positionning of ZMenu
  * Full support for colors in ZLoader
  * Delay click listener in ZDialog so that it is not triggered too early

## 0.2.10 (September 22, 2020)

### Features

  * Responsive ZDrawer controls and small variant

## 0.2.9 (September 17, 2020)

### Fixes

  * Make sure elevation-transition affects also background color

## 0.2.8 (September 17, 2020)

### Features

  * Implement elevation system according to design system specifications

## 0.2.7 (September 15, 2020)

### Features

  * Use auto scroll bars for `ZDrawer`
  * Few sandbox fixes, add zds version
  * Add build config for sandbox
  * Can set height of `ZDivider` component
  * Can use `ZDivider` as linear indeterminate loader

## 0.2.6 (September 11, 2020)

### Features

  * Add a `ZApp` wrapper component that reacts to `ZDrawer` instances
  * Add a `ZDrawer` component

### Fixes

  * Fix `ZExpandable` icon animation

## 0.2.5 (September 3, 2020)

### Features

  * Add `nowrap` option to ZLayout component

## 0.2.4 (September 3, 2020)

### Features

  * Add `width` prop to ZDialog component
  * Fix buttons interaction background to work over dark backrgounds

## 0.2.3 (September 2, 2020)

### Features

  * Add hatched stylus mixin
  * Add fade-scale transition
  * More input examples in Sandbox
  * Add text-color option to ZInput
  * Add prefix, improve prefix & suffix style, add hatched option to ZInput
  * Use proxy mixin instead of state-loose internally declared proxy
  * Improve proxy to use an optional handler

## 0.2.2 (September 2, 2020)

### Fixes

  * Make sure a-type button :hover color is correct
  * Remove useless svgo-loader dependency

## 0.2.1 (September 1, 2020)

### Features

  * Support native input attributes in `attrs` prop for ZInput component

## 0.2.0 (August 31, 2020)

### Features

  * Update simple-parallax-js module
  * Support for theme colors in radios and checkbox components

### Fixes

  * Fix submit-type button triggering form submit even if in disabled or loading state

## 0.1.7 (August 19, 2020)

### Features

  * Add a `suffix` option to ZInput component

## 0.1.6 (August 18, 2020)

### Features

  * Update Readme for quick setup

### Features

  * Few component style & behavior fixes

## 0.1.0 (August 18, 2020)

### Features

  * Extract design system from internal corporate website project

### Fixes

  * Fix dependencies
  * Few style fixes
  * Prettier code
