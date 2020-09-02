# ZDS Web: Vue implementation

This is a Vue implementation of the Zoov Design System.

---

## Getting started

**DISCLAIMER**: For the moment, the library is not yet built so the only way to use it is to link direclty with the sources. For that you will need webpack (or nuxt) to process .vue files along with stylus and pug preprocessors.

### Installation

Run `npm install --save @zoov/design-system` or `yarn add @zoov/design-system`. Then you need to install dev dependencies: `webpack` or `nuxt` and also
```sh
npm install --save-dev stylus stylus-loader pug pug-plain-loader
```
or
```sh
yarn add -D stylus stylus-loader pug pug-plain-loader
```

### Importing zds & components

```js
import Vue from 'vue';
import zds from '@zoov/design-system';

import { ZButton } from '@zoov/design-system/src/components/ZButton';
// and any other available component or all in one:
// import * as components from '@zoov/design-system/src/components/ZButton'

Vue.use(zds, { components: { ZButton } });
```

If you this library server-side such as with Nuxt in universal mode, you must transpile it, _e.g._:
```js
// nuxt.config.js
  build: {
    transpile: ['@zoov/design-system'],
  },
```

### Using built-in svg icons

To properly use `ZIcon` component, you must have an svg **inline** loader (such as `svg-inline-loader`). The config to work with nuxt is, for example:
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

## Authoring

### Install dependencies

```sh
yarn install
```

### Compiles and hot-reloads for development

This will serve `Sandbox.vue` in which you can play with the library:

```sh
yarn serve
```

### Compiles and minifies for production

**DISCLAIMER**: not tested.

```sh
yarn build
```
```sh
yarn build:lib
```

### Lints and fixes files

```sh
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
