# Changelog

## dev (Unreleased)

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
