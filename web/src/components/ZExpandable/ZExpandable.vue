<template lang="pug">
  .z-expandable(:class="classes")
    label.z-expandable__toggle(
      ref="label"
      v-if="!external"
      :class="{ 'z-expandable__toggle--default': !$scopedSlots.activator }"
      :tabindex="$scopedSlots.activator || disabled ? null : '0'"
      @keydown.enter.space.stop.prevent="toggle(false)"
      @click.stop="toggle(true)"
    )
      slot(v-if="$scopedSlots.activator" name="activator" :toggle="toggle")
      template(v-else)
        h5 {{ toggleText }}
        .spacer
        .z-expandable__icon
          z-loader(v-if="loading" color="neutral" size=3 circular)
          template(v-else)
            transition-group(name="zt-fade-rotate")
              z-icon(v-if="proxy__value" key="iconCollapse") {{ iconCollapse }}
              z-icon(v-else key="iconExpand") {{ iconExpand }}
    .z-expandable__container(:style="containerStyle")
      .z-expandable__content(ref="content")
        slot
</template>

<style lang="stylus">
@import '../../styles/components.styl';

.z-expandable
  label.z-expandable__toggle
    &--default
      position relative
      display flex
      height size(5)
      border-radius size(0.5)
      padding 0 size(1)
      margin 0 size(-1)
      align-items center
      background-color transparent
      transition background-color 0.2s
      cursor pointer

      h5
        margin-bottom 0

      &:focus, &:hover
        background-color $focus-background

    &:focus
      outline none

  &.z-expandable--disabled
    label.z-expandable__toggle--default
      cursor default
      opacity 0.5

      &:focus, &:hover
        background-color transparent

.z-expandable__icon
  position relative
  width size(3)
  height size(3)

  .z-icon
    position absolute

.z-expandable__container
    height 0
    overflow hidden
    transition height .25s cubic-bezier(0,0,.28,1)
    will-change height
</style>

<script>
import ZLoader from '../../components/ZLoader';
import ZIcon from '../../components/ZIcon';
import proxy from '../../mixins/proxy';
import { throttle } from '../../modules/utils';

export default {
  name: 'ZExpandable',
  components: { ZIcon, ZLoader },
  mixins: [proxy('value')],
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    toggleText: {
      type: String,
      default: '',
    },
    variant: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    external: {
      type: Boolean,
      default: false,
    },
    transition: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      contentHeight: 0,
      previousContentHeight: 0,
      stableContentHeightInterval: null,
      transitioning: false,
      throttledOnResize: throttle(this.onResize, 500),
    };
  },
  mounted() {
    window.addEventListener('resize', this.throttledOnResize, {
      passive: true,
    });
    // immediate content height computation
    this.computeContentHeight();
    this.previousContentHeight = this.contentHeight;
    // loop to check content height stability (children may not be mounted yet)
    this.stableContentHeightInterval = setInterval(() => {
      this.computeContentHeight();
      if (this.contentHeight === this.previousContentHeight) {
        clearInterval(this.stableContentHeightInterval);
      }
      this.previousContentHeight = this.contentHeight;
    }, 500);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.throttledOnResize);
  },
  computed: {
    classes() {
      const classes = [];
      if (this.proxy__value) classes.push('z-expandable--expanded');
      if (this.transitioning) classes.push('z-expandable--transitioning');
      if (this.disabled) classes.push('z-expandable--disabled');
      return classes;
    },
    iconCollapse() {
      return this.variant ? 'minus' : 'chevron-up';
    },
    iconExpand() {
      return this.variant ? 'plus' : 'chevron-down';
    },
    height() {
      return this.proxy__value ? this.contentHeight : 0;
    },
    containerStyle() {
      const style = { height: this.height };
      if (this.transition) style.transition = this.transition;
      return style;
    },
  },
  methods: {
    toggle(blur) {
      if (this.disabled) return;
      // make sure to recompte height whenever toggle is called
      // as height might not me correctly computed at mounted time
      this.computeContentHeight();
      this.proxy__value = !this.proxy__value;
      if (blur) this.$refs.label && this.$refs.label.blur();
      if (!this.$scopedSlots.activator) {
        this.transitioning = true;
        setTimeout(() => (this.transitioning = false), 300);
      }
    },
    onResize() {
      this.computeContentHeight();
    },
    computeContentHeight() {
      if (!this.$refs.content) return;
      const rect = this.$refs.content.getBoundingClientRect();
      this.contentHeight = rect.height + 'px';
    },
  },
  watch: {
    value() {
      // make sure to recompte height if value changes externally
      // as height might not me correctly computed at mounted time
      this.computeContentHeight();
    },
  },
};
</script>
