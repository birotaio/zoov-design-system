<template lang="pug">
  z-menu.z-lang-picker(
    :hover="hover"
    :noscript-href="langNoscriptHref"
    focusable
    :right="right"
  )
    template(v-slot:activator)
      .z-lang-picker__menu-activator
        z-icon.mr-1(:size="2" flag) {{ lang }}
        h6 {{ lang.toUpperCase() }}

    template(v-for="(item, i) in items")
      z-divider.my-0(v-if="i !== 0")
      z-link(:to="item.to" :href="item.href" :hreflang="item.lang")
        h6.z-lang-picker__lang-link {{ item.text }}
</template>

<style lang="stylus">
@import '../../styles/components.styl';

.z-lang-picker__menu-activator
  display flex
  align-items center

.zds h6.z-lang-picker__lang-link
  margin size(2) 0
  color: $colors.neutral.dark-3

  &:hover
    color: $colors.primary.base
    transition color 0.2s ease
</style>

<script>
import ZLink from '../../components/ZLink';

export default {
  name: 'ZLangPicker',
  components: { ZLink },
  props: {
    lang: {
      type: String,
      default: 'fr',
    },
    items: {
      type: Array,
      default: null,
    },
    hover: {
      type: Boolean,
      default: false,
    },
    right: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    langNoscriptHref() {
      if (!this.items) return null;
      const length = this.items.length;
      if (!length) return null;
      const index = this.items.findIndex(({ lang }) => lang === this.lang);
      const nextItem = this.items[(index + 1) % length];
      return nextItem.to.path || nextItem.href;
    },
  },
};
</script>
