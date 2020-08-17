module.exports = {
  pages: {
    sandbox: {
      entry: 'src/sandbox/main.js',
      template: 'src/sandbox/index.html',
      filename: 'index.html',
    },
  },
  // add loaders using chainWebpack
  chainWebpack: config => {
    // use vue-svg-loader to inline svg
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('svg-inline-loader')
      .loader('svg-inline-loader')
      .end()
      .use('svgo-loader')
      .loader('svgo-loader')
      .options({
        plugins: [
          { removeTitle: true },
          { removeViewBox: false },
          { convertShapeToPath: true },
          { removeAttrs: { attrs: '(fill|fill-rule)' } },
          { inlineStyles: { onlyMatchedOnce: false } },
          {
            addViewBox: {
              type: 'perItem',
              active: true,
              name: 'addViewBox',
              description:
                'replaces width, height attributes of an svg with viewBox attribute to make it responsive',
              fn: item => {
                if (
                  item.isElem(['svg']) &&
                  !item.hasAttr('viewBox') &&
                  item.hasAttr('width') &&
                  item.hasAttr('height')
                ) {
                  const width = parseFloat(
                    item.attr('width').value.replace(/px$/, '')
                  );
                  const height = parseFloat(
                    item.attr('height').value.replace(/px$/, '')
                  );
                  item.removeAttr('width');
                  item.removeAttr('height');
                  item.addAttr({
                    name: 'viewBox',
                    prefix: '',
                    local: 'viewBox',
                    value: '0 0 ' + width + ' ' + height,
                  });
                }
              },
            },
          },
        ],
      });
  },
};
