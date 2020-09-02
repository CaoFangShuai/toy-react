const path = require('path')
module.exports = {
  entry: {
    main: path.resolve(__dirname, '../src/main.js'),
  },
  mode: 'development',
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                [
                  '@babel/plugin-transform-react-jsx',
                  {
                    pragma: 'ToyReact',
                  },
                ]
              
              ],
            },
          },
        ],
      },
    ],
  },
}
