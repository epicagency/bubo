module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'lib/bubo.js',
    library: 'bubo',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env'],
        },
      },
    ],
  },
};
