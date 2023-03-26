const path = require('path');
const nodeExternals = require('webpack-node-externals');


module.exports = {
  entry: {
    index: "./src/index.ts",
    botDiscoveryEmu: "./src/botDiscoveryEmu.ts",
    getName: "./src/getName.ts"
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'module',
    chunkFormat: 'module',
  },
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
  externalsPresets: { node: true },
  experiments: {
    topLevelAwait: true,
    outputModule: true,
  },
};