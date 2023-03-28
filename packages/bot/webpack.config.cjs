const path = require('path');
const nodeExternals = require('webpack-node-externals');


module.exports = {
  entry: {
    index: "./src/index.ts",
    getName: "./src/getName.ts",
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
  },
  target: 'node16',
  externals: [
    // nodeExternals(),
    // nodeExternals({
    //   modulesDir: path.resolve(__dirname, '../../node_modules'),
    //   allowlist: ['schema', 'utils', 'uuid-readable', 'multicast-dns', 'webtopics', "dns-packet"]
    // }),
    // Disallow anything used by rosnodejs using regex
    // { rosnodejs: 'commonjs rosnodejs' },
    // { 'rosnodejs/dist/roslib': 'commonjs rosnodejs/dist/roslib' },
    
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