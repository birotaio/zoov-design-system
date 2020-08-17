<template lang="pug">
  .z-lottie(:style="style" ref="lottieContainer")
</template>

<style lang="stylus">
@import '../../styles/components.styl';

.z-lottie
  overflow 'hidden'
  margin 0 auto
  width 100%
  height 100%
</style>

<script>
import lottie from 'lottie-web';
import { sizeStyle } from '../../modules/utils';

export default {
  name: 'ZLottie',
  props: {
    options: {
      type: Object,
      required: true,
    },
    width: {
      type: [String, Number],
      default: '',
    },
    height: {
      type: [String, Number],
      default: '',
    },
    playState: {
      type: String,
      default: 'stop',
    },
  },
  mounted() {
    this.animation = lottie.loadAnimation({
      container: this.$refs.lottieContainer,
      renderer: this.options.renderer || 'svg',
      loop: this.options.loop || false,
      autoplay: this.options.autoplay || false,
      animationData: this.options.animationData,
      rendererSettings: this.options.rendererSettings,
    });
    this.$emit('animation-created', this.animation);
    if (this.options.autoplay) this.$emit('update:playState', 'play');
    this.registerEvents();
  },
  beforeDestroy() {
    if (this.animation) this.animation.destroy();
  },
  computed: {
    style() {
      return {
        ...sizeStyle(this.width, { height: false }),
        ...sizeStyle(this.height, { width: false }),
      };
    },
  },
  methods: {
    executePlayState() {
      switch (this.playState) {
        case 'play':
          this.animation.play();
          break;
        case 'pause':
          this.animation.pause();
          break;
        case 'stop':
          this.animation.stop();
          break;
      }
    },
    registerEvents() {
      [
        'complete',
        'loopComplete',
        'enterFrame',
        'segmentStart',
        'config_ready',
        'data_ready',
        'data_failed',
        'loaded_images',
        'DOMLoaded',
        'destroy',
      ].forEach(eventName => {
        this.animation.addEventListener(eventName, e => this.$emit(eventName, e));
      });
    },
  },
  watch: {
    playState() {
      if (!this.animation) return;
      this.executePlayState();
    },
  },
};
</script>
