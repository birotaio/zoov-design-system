<template lang="pug">
.z-select
  .z-select__label(v-if="label")
    z-label {{ label }}
  .z-select__value(@click="openMenu = !openMenu")
    input(
      readonly="readonly"
      type="text"
      aria-readonly="false"
      autocomplete="off"
      :value="selectedOption"
      @focus="inputFocus = true"
      @blur="inputFocus = false"
    )
    .z-select__arrows
      z-icon(:size="2") chevron-up
      z-icon(:size="2") chevron-down
  //- .z-select__value(@click="openMenu = !openMenu")
  //- p {{ selectedOption }}
  //- .z-select__arrows
  //- z-icon(:size="2") chevron-up
  //- z-icon(:size="2") chevron-down

  ul.z-select__options(:class="{ active: openMenu }")
    li.z-select__option(
      v-for="(option, index) in options"
      @mouseover="listFocus = true; hoverIndex = null"
      @mouseout="listFocus = false"
      @click="proxy__value = option; openMenu = false"
      :class="{ hover : hoverIndex === index }"
      :style="{ 'font-weight': selectedOption === option ? 'bold' : 'normal' }"
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
    border-radius size(0.5)
    display flex
    align-items center
    > input
      padding-left size(2)
      width 100%
      height 100%

    input:hover
      cursor auto

    input:focus
      outline none

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
    border-radius size(0.5)
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

    .z-select__option.hover
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
      inputFocus: false,
      listFocus: false,
      hoverIndex: this.value ? this.options.indexOf(this.value) : 0,
    };
  },
  computed: {
    selectedOption() {
      return this.value || this.options[0];
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeys);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeys);
  },
  methods: {
    handleKeys(e) {
      if (this.openMenu) {
        if (['ArrowUp', 'ArrowDown', 'Space'].indexOf(e.code) > -1) {
          e.preventDefault();
        }
        switch (e.code) {
          case 'ArrowDown':
            if (this.hoverIndex === null) {
              this.hoverIndex = 0;
            } else if (this.hoverIndex < this.options.length - 1) {
              this.hoverIndex++;
            }
            break;
          case 'ArrowUp':
            if (this.hoverIndex === null) {
              this.hoverIndex = this.options.length - 1;
            } else if (this.hoverIndex > 0) {
              this.hoverIndex--;
            }
            break;
          case 'Enter':
          case 'Space':
            this.proxy__value = this.options[this.hoverIndex];
            this.openMenu = false;
            break;
        }
      }
    },
  },
  watch: {
    inputFocus(value) {
      if (!value && !this.listFocus) this.openMenu = false;
    },
    openMenu(value) {
      if (!value) this.hoverIndex = this.options.indexOf(this.value);
    },
  },
};
</script>
