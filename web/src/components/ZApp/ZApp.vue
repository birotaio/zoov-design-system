<template lang="pug">
  .z-app.zds(:style="style")
    slot
</template>

<style lang="stylus">
@import '../../styles/components.styl';

.z-app
  transition padding $transform-duration $ease
</style>

<script>
export default {
  name: 'ZApp',
  computed: {
    drawer() {
      return this.$zds.app.drawer;
    },
    style() {
      if (this.drawer && this.drawer.value) {
        const postition = this.drawer.right ? 'right' : 'left';
        return { ['padding-' + postition]: this.drawer.width };
      } else {
        return {};
      }
    },
  },
};
</script>
