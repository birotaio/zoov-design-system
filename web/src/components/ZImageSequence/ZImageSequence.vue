<template lang="pug">
  .z-image-sequence(:style="style")
    img(v-for="(src, i) in sources" :key="'seq-img-' + i" :src="src" :style="imgStyle(i)")
</template>

<style lang="stylus">
@import '../../styles/components.styl';
.z-image-sequence
  position relative

  img
    position absolute
    top 0
    left 0
    visibility hidden

    &:first-child
      position static
</style>

<script>
import { sizeStyle } from '../../modules/utils';

export default {
  name: 'ZImageSequence',
  props: {
    sources: {
      type: Array,
      default: () => [],
    },
    width: {
      type: [String, Number],
      default: '',
    },
    imgWidth: {
      type: [String, Number],
      default: '',
    },
    loop: {
      type: Boolean,
      default: false,
    },
    fps: {
      type: Number,
      default: 25,
    },
    animationState: {
      type: String,
      default: 'stop',
    },
  },
  data() {
    return {
      display: [],
      animationInterval: null,
      frame: 0,
    };
  },
  created() {
    this.initAnimation();
  },
  async mounted() {
    await Promise.all(this.sources.map(src => this.preloadImage(src)));
    if (this.animationState === 'play') this.startAnimation();
  },
  beforeDestroy() {
    this.stopAnimation();
  },
  computed: {
    nSources() {
      return this.sources.length;
    },
    style() {
      return sizeStyle(this.width, { height: false });
    },
  },
  methods: {
    preloadImage(src) {
      return new Promise(resolve => {
        const image = new Image();
        image.onload = () => resolve([null]);
        image.onerror = error => resolve([error]);
        image.src = src;
      });
    },
    initAnimation() {
      this.display = new Array(this.nSources).fill(false);
      this.$set(this.display, 0, true);
    },
    startAnimation() {
      this.animationInterval = setInterval(() => {
        this.$set(this.display, this.frame, false);
        this.frame = (this.frame + 1) % this.nSources;
        this.$set(this.display, this.frame, true);
        if (this.frame === this.nSources - 1 && !this.loop)
          this.stopAnimation();
      }, 1000 / this.fps);
    },
    pauseAnimation() {
      clearInterval(this.animationInterval);
    },
    stopAnimation() {
      clearInterval(this.animationInterval);
      this.frame = 0;
    },
    imgStyle(i) {
      let style = {};
      if (this.width || this.imgWidth) {
        style = sizeStyle(this.width || this.imgWidth, { height: false });
      }
      if (this.display[i]) style.visibility = 'visible';
      return style;
    },
  },
  watch: {
    animationState(newVal) {
      if (newVal === 'play') this.startAnimation();
      else if (newVal === 'stop') this.stopAnimation();
      else if (newVal === 'pause') this.pauseAnimation();
    },
  },
};
</script>
