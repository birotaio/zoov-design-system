# ZDS Web – VueJS implementation

This is a VueJS implementation of [Zoov Design System](https://sketch.cloud/s/YrWqO).

---

## Getting started

To benefit from tree-shaking you need to **link direclty with the sources**. For that you will need Webpack (or Nuxt) to process `.vue` files along with stylus and pug preprocessors.
Otherwize you can build the lib with `yarn build:lib` and use the built JS and CSS files in `/dist`.

### Installation

Run `npm install --save @zoov/design-system` or `yarn add @zoov/design-system`. Then you need to install dev dependencies: `webpack` or `nuxt` and also:
```sh
npm install --save-dev stylus stylus-loader pug pug-plain-loader
```
or:
```sh
yarn add -D stylus stylus-loader pug pug-plain-loader
```

### Auto import styles

#### Webpack

If you are using Webpack, you may want to automatically import component styles. In your Webpack config, use:
```js
// webpack config
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        loader: 'stylus-loader',
        options: {
          import: ['~@zoov/design-system/src/styles/components'],
        },
      },
      ...
    ],
  }
```

#### Vue CLI

Alternately, in a project created using Vue CLI, you can add this config:
```js
// vue.config.js
  css: {
    loaderOptions: {
      stylus: {
        import: ['~@zoov/design-system/src/styles/components'],
      },
    },
  },
```

#### Nuxt

If you use Nuxt, the simplest way is to install the module `@nuxtjs/style-resources` and add:
```js
// nuxt.config.js
  styleResources: {
    stylus: ['~@zoov/design-system/src/styles/components.styl'],
  },
```

### Importing zds & components

```js
import Vue from 'vue';
import zds from '@zoov/design-system';

import * as components from '@zoov/design-system/src/components'

Vue.use(zds, { components });

// alternately you can cherry-pick components to benefit from tree-shaking:
// import { ZButton } from '@zoov/design-system/src/components/ZButton';
// Vue.use(zds, { components: { ZButton } });
```

If you need this library to be rendered server-side such as with Nuxt in universal mode, you must transpile it, _e.g._:
```js
// nuxt.config.js
  build: {
    transpile: ['@zoov/design-system'],
  },
```

### Using built-in svg icons

To properly use `ZIcon` component, you must have an svg **inline** loader (such as `svg-inline-loader`).

#### Webpack

```js
// webpack config
  module: {
    rules: [
      {
        test: /\.svg?$/,
        loader: 'svg-inline-loader',
      },
      ...
    ],
  }
```

#### Vue CLI

```js
// vue.config.js
  chainWebpack: config => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('svg-inline-loader')
      .loader('svg-inline-loader')
      .end();
  }
```

#### Nuxt

```js
// nuxt.config.js
  build: {
    extend(config) {
      config.module.rules.find(rule => rule.test.test('.svg')).test = /\.(png|jpe?g|gif|webp)$/i;
      config.module.rules = config.module.rules.concat([
        {
          test: /\.svg$/,
          use: ['svg-inline-loader'],
        },
      ]);
    },
  },
```

---

## Documentation

### Instance `zds`

The library exposes an instance of `zds` accessible on `vm` instances using:
```js
this.$zds
```
It exposes few helpers, inspired by Vuetify, such as:
```js
// get the client width
this.$zds.clientWitdh: Number
// used to know under which breakpoint the client width is
this.$zds.breakpoint.xxs: Boolean
this.$zds.breakpoint.xs: Boolean
this.$zds.breakpoint.sm: Boolean
this.$zds.breakpoint.md: Boolean
this.$zds.breakpoint.lg: Boolean
// useful to distinguish between SSR and Browser
this.$zds.client: Boolean
// to know if we are on a touch device
this.$zds.isTouchDevice: Boolean
```

### Directives

- `v-parallax="options"`

  Add a smooth parallax effect using `simple-parallax-js`. Default options are:
  ```js
  {
      scale: 1.5,
      delay: 0.5,
      transition: 'cubic-bezier(0,0,0,1)',
      overflow: true,
  }
  ```

- `v-client="transition" // transition = 'fade' | null`

  Add a `v-client` class to the element rendered en server-side, which is used to hide element using opacity. When mounted on client-side, the `v-client` class is removed so that the component is revealed.

### Styles

#### Convention

The class naming conventions is [BEM](http://getbem.com/naming/) (with scope prefix `z-`, and `zt-` for Vue transitions).

#### Using ZDS styles

**IMPORTANT NOTE**: For all the HTML elements of your document to be affected by ZDS styles, you need to wrap all the content in `ZApp` component or add to the document container element the class `.zds`.

#### Mixins and functions

When direclty linking this library style sources, you will be provided with utility functions and mixins that can straighlty be used in your stylus code:

- Function `size($n)`
  Can be used to space and size based on multiples of `$step` (curently `8px`)

- Other mixins are defined in `src/styles/tools/mixins.styl`. The are useful for example to apply background-color, text-color, elevation (shadows), and typography rules...

#### Media queries mixins

Media queries mixins with predefined behaviour and breakpoints can be called as:

- Rules applied for all window size greater or equal than `$breakpoint_name`:
```stylus
+media-up($breakpoint_name)
```

- Rules applied for all window size greater or equal than `$breakpoint_name`:
```stylus
+media-up($breakpoint_name)
```

- Rules applied for all window sizes between `$breakpoint_name` and `$breakpoint_name_2`:
```stylus
+media-between($breakpoint_name_1, $breakpoint_name_2)
```

Breakpoints are defined as:
```stylus
$breakpoints := {
  'xxs': 360px,
  'xs': 600px,
  'sm': 960px,
  'md': 1200px,
  'lg': 1920px,
}
```

#### Utility classes

Several utility classes are defined and can be used straightaway.

##### Colors

Colors can be directly used by their variable if you import the stylus files:
```stylus
$colors.<color_name>.<color_shade>
```
Names and shades are defined in `src/styles/settings/colors.styl`. Shade scale is varying as:
```stylus
dark-{n} ... dark-2 dark-1 base light-1 light-2 ... light-{n}
```
and available names are:
```stylus
// from light-5 to dark-5
neutral
// from light-2 to dark-2
primary
secondary
success
info
warning
danger
alt-blue
alt-purple
// only 'base'
white
black
zoov-maintenance
```

Or you can use the corresponding classes:
```stylus
.{$color_name} // to apply 'base' background color
.text--{$color_name} // to apply 'base' text & icon color
.{$color_name}--{$color_shade} // to apply a darker or lighter background color
.text--{$color_name}--${color_shade} // to apply a darker or lighter text & icon color
```

Example:
```pug
span.primary.text--neutral--lighten-3 zoov
```
will be displayed as <span style="background-color: #33C5FF; color: #E5EBED">zoov</span>

#### Marging and padding

Nomenclature:
`.{S}{D}-{V}`

Where:

`S` is `m` for **margin** and `p` for **padding**,

`D` is the direction where to apply the spacing:
  - `t`: **top**
  - `l`: **left**
  - `r`: **right**
  - `b`: **bottom**
  - `x`: **left** and **right**
  - `y`: **top** and **bottom**
  - `a`: all

`V` is the spacing value (mutliple of `8px`)

Examples:
```
.mt-2 // margin-top: 16px !important;
.pb-3 // padding-bottom: 24px !important;
.mx-1 // margin-left: 16px !important;
      // margin-right: 16px !important;
```

#### Opacity

```
.alpha-0      // => opacity: 0   (0%)
.alpha-10     // => opacity: 0.1 (10%)
.alpha-20     // => opacity: 0.2 (20%)
.alpha-30     // => opacity: 0.3 (30%)
.alpha-40     // => opacity: 0.4 (40%)
.alpha-50     // => opacity: 0.5 (50%)
.alpha-60     // => opacity: 0.6 (60%)
.alpha-70     // => opacity: 0.7 (70%)
.alpha-80     // => opacity: 0.8 (80%)
.alpha-90     // => opacity: 0.9 (90%)
.alpha-100    // => opacity: 1   (100%)
```

##### Typography rules

These classes apply the corresponding tag style:
```stylus
.typography--display-3 // h1
.typography--display-2 // h2
.typography--display-1 // h3
.typography--heading // h4
.typography--title // h5
.typography--subheading // h6, input
.typography--body // p, ul, li, label
.typography--caption // small, caption
.typography--button // button, input
```

##### Text transformations

- Non-breaking white-spaces:
```stylus
.text--nowrap
```

- Adjust line-height, where `$n` is a multiple of 8px
```stylus
.text--lh-{$n}
```

- Weights:
```stylus
.text--{$weight}
```
where weights are defined such as:
```stylus
$weights := {
  thin:         100,
  extra-light:  200,
  light:        300,
  normal:       400,
  medium:       500,
  semi-bold:    600,
  bold:         700,
  extra-bold:   800,
  black:        900
}
```

- Alignments
```stylus
.text--{left|right|center}
```

#### Responsive conditional display

```stylus
.{$breakpoing_name}-and-down
  @media (min-width: $breakpoint_value)
    display none !important

.{$breakpoing_name}-and-up
  @media (max-width: $breakpoint_value - $epsilon)
    display none !important
```

### Components

The components are not properly documented for now, but looking to the sources should be self explainatory.

### Transitions

Vue transitions are defined in `src/styles/generic/transition.styl`:

```stylus
.zt-fade
.zt-fade-out
.zt-fade-in
.zt-fade-rotate
.zt-scale
.zt-fade-scale
.zt-from-top
.zt-from-left
.zt-from-right
.zt-from-bottom
.zt-fade-from-top
.zt-fade-from-left
.zt-fade-from-right
.zt-fade-from-bottom
```
---

## Authoring

### Install dependencies

```sh
yarn install
```

### Compiles and hot-reloads for development

This will serve `Sandbox.vue` in which you can play with the library:

```sh
yarn dev
```

### Build sandbox

```sh
yarn build:sandbox
```

### Compiles and minifies for production

```sh
yarn build:lib
```

### Lints and fixes files

```sh
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
