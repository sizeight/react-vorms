const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const nodeEnv = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const isProduction = nodeEnv === 'production';

const sourcePath = path.join(__dirname, './src/');
const buildPath = path.join(__dirname, './lib/');

// Common plugins
const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv),
    },
  }),
];

if (process.env.ANALYSE === 'true') {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  mode: nodeEnv,
  devtool: isProduction ? false : 'source-map',
  context: sourcePath,
  entry: {
    'react-vorms': `${sourcePath}index.js`,
  },
  output: {
    path: buildPath,
    filename: isProduction ? '[name].min.js' : '[name].js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        use: [
          'eslint-loader',
        ],
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  plugins,
  externals: [
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
    },
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
    },
    {
      'prop-types': {
        root: 'prop-types',
        commonjs2: 'prop-types',
        commonjs: 'prop-types',
        amd: 'prop-types',
      },
    },
    {
      reactstrap: {
        root: 'reactstrap',
        commonjs2: 'reactstrap',
        commonjs: 'reactstrap',
        amd: 'reactstrap',
      },
    },
    {
      'react-datepicker': {
        root: 'react-datepicker',
        commonjs2: 'react-datepicker',
        commonjs: 'react-datepicker',
        amd: 'react-datepicker',
      },
    },
    {
      'react-datepicker/dist/react-datepicker.css': {
        root: 'react-datepicker/dist/react-datepicker.css',
        commonjs2: 'react-datepicker/dist/react-datepicker.css',
        commonjs: 'react-datepicker/dist/react-datepicker.css',
        amd: 'react-datepicker/dist/react-datepicker.css',
      },
    },
    {
      'draft-js': {
        root: 'draft-js',
        commonjs2: 'draft-js',
        commonjs: 'draft-js',
        amd: 'draft-js',
      },
    },
    {
      'draft-js-import-html': {
        root: 'draft-js-import-html',
        commonjs2: 'draft-js-import-html',
        commonjs: 'draft-js-import-html',
        amd: 'draft-js-import-html',
      },
    },
    {
      'draft-js-export-html': {
        root: 'draft-js-export-html',
        commonjs2: 'draft-js-export-html',
        commonjs: 'draft-js-export-html',
        amd: 'draft-js-export-html',
      },
    },
  ],
};
