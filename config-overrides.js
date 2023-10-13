var path = require('path');
var fs = require('fs');
const {
  override,
  addDecoratorsLegacy,
  disableEsLint,
  addWebpackAlias,
  fixBabelImports,
  addLessLoader,
} = require('customize-cra');

module.exports = function (config, env) {
  return Object.assign(
    config,
    override(
      disableEsLint(),
      addDecoratorsLegacy(),
      /* Make sure Babel compiles the stuff in the common folder */

      addWebpackAlias({
        react: path.resolve('./node_modules/react'),
      }),
      fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      }),
      addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#DC241F',
          '@menu-inline-toplevel-item-height': '35px',
          '@menu-item-height': '35px',
          '@btn-disable-color': '#780000',
        },
      })
    )(config, env)
  );
};
