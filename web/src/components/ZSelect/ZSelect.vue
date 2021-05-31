<template lang="pug">
.z-select
  .z-select__label(v-if="label")
    z-label {{ label }}
  .z-select__value(@click="openMenu = !openMenu")
    p {{ optionSelected }}
    .z-select__arrows
      z-icon(:size="2") chevron-up
      z-icon(:size="2") chevron-down

  ul.z-select__options(:class="{ active: openMenu }")
    li.z-select__option(
      v-for="option in options"
      @click="proxy__value = option; openMenu = false"
      :style="{ 'font-weight': optionSelected === option ? 'bold' : 'normal' }"
    ) {{ option }}
</template>

<style lang="stylus">
@import '../../styles/components.styl'

.z-select
  width 100%
  position relative
  padding size(1) 0

  .z-select__label
    display flex
    justify-content space-between
    align-items baseline
    margin-bottom size(1)

    .z-label
      cursor pointer

  .z-select__value
    height size(6)
    position relative
    background white
    border-radius size(1)
    display flex
    align-items center
    padding-left size(2)

  .z-select__arrows
    position absolute
    flex-direction column
    display flex
    right size(2)

  .z-select__options
    width 100%
    z-index 1000
    margin-top size(1)
    list-style-type none
    margin-left 0
    border-radius size(1)
    opacity 0
    pointer-events none
    overflow hidden
    position absolute
    transition opacity 0.1s linear

    .z-select__option
      background white
      height size(6)
      display flex
      align-items center
      padding size(2) 0 size(2) size(2)

      &:hover
        background: $colors.primary.light-2

  .z-select__options.active
    opacity 1
    pointer-events auto
</style>

<script>
import ZLabel from '../../components/ZLabel';
import ZIcon from '../../components/ZIcon';
import proxy from '../../mixins/proxy';

export default {
  name: 'ZSelect',
  components: { ZLabel, ZIcon },
  mixins: [proxy('value')],
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: '',
    },
    // any type
    value: null,
  },
  data() {
    return {
      openMenu: false,
    };
  },
  computed: {
    optionSelected() {
      return this.value || this.options[0];
    },
  },
};
</script>
