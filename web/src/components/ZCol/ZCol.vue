<template lang="pug" functional>
  .z-col(
    :ref="data.ref"
    :class="[data.class, data.staticClass, props]"
    :style="[data.style, data.staticStyle]"
    v-on="listeners"
  )
    slot
</template>

<style lang="stylus">
@import '../../styles/components.styl';

.z-col
  flex 1 1 auto
  box-sizing border-box
</style>

<script>
const colsNum = 12;
const breakpoints = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'];
const colsArray = new Array(colsNum).fill(0).map((_, i) => i + 1);

const propsArray = breakpoints.reduce(
  (array, name) =>
    array.concat(
      colsArray.map(n => ({
        key: [`${name}${n}`],
        def: {
          type: Boolean,
          default: false,
        },
      }))
    ),
  []
);

const props = propsArray.reduce((object, prop) => {
  object[prop.key] = prop.def;
  return object;
}, {});

export default {
  name: 'ZCol',
  props,
};
</script>
