module.exports = {
  rules: [
    {
      test: /\/src\/js\/(?:.*)\.css$/,
      use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
    },
    {
      test: [/\.scss$/, /\.sass$/],
      use: [
        {
          loader: 'sass-loader',
          options: {
            outputStyle: 'compressed',
            sourceMap: true,
            includePaths: ['./src']
          }
        }
      ]
    }
  ]
};
