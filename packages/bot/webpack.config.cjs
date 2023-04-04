const path = require('path');
const nodeExternals = require('webpack-node-externals');


module.exports = {
  entry: {
    main: "./src/main.ts",
    getName: "./src/getName.ts",
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
  },
  target: 'node16',
  externals: [
    nodeExternals({
      allowlist: [/^(?!rosnodejs).*$/],
    }),
    function (context, request, callback) {
      if (request.startsWith('rosnodejs')) {
        return callback(null, 'commonjs ' + request);
      }
      callback();
    },
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