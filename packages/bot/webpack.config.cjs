const path = require('path');
const nodeExternals = require('webpack-node-externals');


module.exports = {
  entry: './src/botDiscoveryEmu.ts', // Your entry file
  target: 'node',
  externals: [nodeExternals()],
  mode: 'production',
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
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'module',
    chunkFormat: 'module',
  },
  externalsPresets: { node: true },
  experiments: {
    topLevelAwait: true,
    outputModule: true,
  },
};