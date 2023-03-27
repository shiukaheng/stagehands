const path = require('path');
const nodeExternals = require('webpack-node-externals');


module.exports = {
  entry: {
    index: "./src/index.ts",
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
  },
  target: 'node16',
  externals: [nodeExternals(),
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../../node_modules'),
    }),
    // Make rosnodejs an external dependency:
    { rosnodejs: 'commonjs rosnodejs' }
  ],
  // mode: 'production',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        resolve: {
          fullySpecified: false,
        },
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  externalsPresets: { node: true },
  experiments: {
    topLevelAwait: true,
  },
};