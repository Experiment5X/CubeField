var path = require('path');

module.exports = {
  devServer: {
    contentBase: __dirname,
    compress: true,
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
};

