<style lang="stylus">
@import '../../styles/components.styl';

.z-icon
  display inline-flex
  align-items center
  justify-content center
  width size(3)
  height size(3)
  min-width size(3)
  min-height size(3)
  transition all $scale-duration $ease-in-out

  img
    width 100%

  svg
    flex-grow 1

  path
    transition fill 0.2s ease

  &:not(.z-icon--self-color)
    path
      fill currentColor
</style>

<script>
import { sizeStyle } from '../../modules/utils';

export default {
  name: 'ZIcon',

  functional: true,

  props: {
    size: {
      type: [String, Number],
      default: null,
    },
    color: {
      type: String,
      default: '',
    },
    selfColor: {
      type: Boolean,
      default: false,
    },
    src: {
      type: String,
      default: null,
    },
    markup: {
      type: String,
      default: null,
    },
  },

  render(h, ctx) {
    const { data, children, props } = ctx;
    let iconName, svgMarkup;

    // Set color
    if (props.color) {
      data.class = (data.class || []).concat('text--' + props.color);
    }
    if (props.selfColor) {
      data.class = (data.class || []).concat('z-icon--self-color');
    }

    // Set size if providen. If size has units, use if, otherwise use it as multiple of
    // defined default size increment.
    const style = sizeStyle(props.size);

    // New context, add style and classes
    const newCtx = Object.assign(ctx, ctx.data);
    newCtx.style = [newCtx.style, style];
    newCtx.class = [newCtx.class, 'z-icon'];

    // If src is providen, just render it as an image
    const newChildren = [];
    if (props.src) {
      newChildren.push(h('img', { domProps: { src: props.src } }));
    } else {
      // Otherwize use markup...
      if (props.markup) {
        svgMarkup = props.markup;
      } else {
        // or text to pick an icon in zds collection
        // Support usage of v-text and v-html
        if (data.domProps) {
          iconName = data.domProps.textContent || data.domProps.innerHTML || '';
          // Remove nodes so it doesn't overwrite our changes
          delete data.domProps.textContent;
          delete data.domProps.innerHTML;
        } else {
          iconName = (children && children[0] && children[0].text) || '';
        }

        if (iconName) {
          // All the svg files from the the directory will be added to the bundle
          // TODO: For better tree-shaking, declare an icon file per icon...
          svgMarkup = require('../../assets/icons/icon-24x24-' +
            iconName +
            '.svg');
        }
      }
      // Pass svg markup to template
      newCtx.domProps = newCtx.domProps || {};
      newCtx.domProps.innerHTML = svgMarkup;
    }

    return h('div', newCtx, newChildren);
  },
};
</script>
