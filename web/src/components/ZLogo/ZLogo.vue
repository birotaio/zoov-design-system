<style lang="stylus">
@import '../../styles/components.styl';

.z-logo
  display flex
  width size(24)
  transition width $transform-duration $ease
  box-sizing content-box

  svg
    flex 1 1 auto

  &.z-logo--slanted
    svg
      transform rotate(-17deg)
</style>

<script>
import zoovPath from '../../assets/logos/zoov-path.js';
import zoovOutlinePath from '../../assets/logos/zoov-outline-path.js';
import { hasUnits, getCssVar } from '../../modules/utils';

// Little bit of geomerty
const defaultW = 24;
const outlineWidth = 40;
const alpha = (17 * Math.PI) / 180;
const sinAlpha = Math.sin(alpha);
const cosAlpha = Math.cos(alpha);
const baseW = 1170;
const baseH = 312;
const baseHOutline = 371;
const ratio = baseH / baseW;
const ratioOutline = baseHOutline / baseW;
const kAlpha = (sinAlpha + ratio * (cosAlpha - 1)) / 2;
const kAlphaOutline = (sinAlpha + ratioOutline * (cosAlpha - 1)) / 2;

export default {
  name: 'ZLogo',

  functional: true,

  props: {
    width: {
      type: [String, Number],
      default: null,
    },
    color: {
      type: String,
      default: 'primary',
    },
    outline: {
      type: Boolean,
      default: false,
    },
    slanted: {
      type: Boolean,
      default: false,
    },
  },

  render(h, ctx) {
    const props = ctx.props;
    const newCtx = Object.assign(ctx, ctx.data);

    // Set classes
    newCtx.class = [newCtx.class, 'z-logo', 'text--' + props.color];
    if (props.slanted) newCtx.class.push('z-logo--slanted');
    if (props.outline) newCtx.class.push('z-logo--outline');

    // Set width if providen. If size has units, use if, otherwise use it as multiple of
    // defined default size increment.
    const step = getCssVar('--step', 8);
    const width = props.width || defaultW;
    const widthStr = hasUnits(width) ? width : `${width * step}px`;
    const r = props.outline ? ratioOutline : ratio;

    const style = {};
    style.width = widthStr;
    style.height = `calc(${widthStr} * ${r})`;

    // If slanted, we need the parent container to cover the child, so make it higher
    // Additional padding y0 = (width / 2) * (sin(α) + ratio * (cos(α) - 1))
    // We define k(α) = (sin(α) + ratio * (cos(α) - 1)) * sin(α) / 2,
    // so that y0 = k(α) * width;
    if (props.slanted) {
      const k = props.outline ? kAlphaOutline : kAlpha;
      style.padding = `calc(${widthStr} * ${k}) 0`;
    }

    newCtx.style = [newCtx.style, style];

    // Set paths & viewBox given outline option
    const x1 = baseW - 2 * outlineWidth;
    const y1 = baseHOutline - 2 * outlineWidth;
    const x0 = outlineWidth;
    const y0 = outlineWidth;
    let viewBox = `${x0} ${y0} ${x1} ${y1}`;
    const paths = [];
    if (props.outline) {
      viewBox = `0 0 ${baseW} ${baseHOutline}`;
      paths.push(
        h('path', { attrs: { 'fill-opacity': 0.2, d: zoovOutlinePath } })
      );
    }
    paths.push(h('path', { attrs: { d: zoovPath } }));

    return h('div', newCtx, [
      h(
        'svg',
        {
          attrs: {
            xmlns: 'http://www.w3.org/2000/svg',
            viewBox,
          },
        },
        paths
      ),
    ]);
  },
};
</script>
