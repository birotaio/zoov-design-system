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
  },
};
