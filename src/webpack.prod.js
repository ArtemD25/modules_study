const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(common, {
  mode: 'production', // code mode in the final bundle js-file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
    assetModuleFilename: 'assets/img/[name].[hash][ext]',
    environment: {
      arrowFunction: false
    }
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()]
  }
});
