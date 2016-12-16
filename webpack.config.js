// webpack.config.js

module.exports = {
  // the main entry of our app
  entry: [
    // a: "./src/index.js", // a requires b
    "./src/index.js"
    //  './src/index.js' 
  ],
  // output configuration
  output: {
    path: __dirname + '/build/',
    publicPath: 'build/',
    filename: 'build.js'
  },

  module: {
    loaders: [
      // process *.vue files using vue-loader
      { test: /\.vue$/, loader: 'vue' },
      {
        test: /\.css$/, loaders: [
          'style',
          'css',]
      },
      {
        test: /.json$/,
        loaders: [
          'json'
        ]
      },
      // process *.js files using babel-loader
      // the exclude pattern is important so that we don't
      // apply babel transform to all the dependencies!
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },

  babel: {
    presets: ['es2015', 'stage-2'],
    plugins: [
      ['transform-runtime'],
      ['transform-object-rest-spread'],
      ['transform-es2015-destructuring']
      // ['transform-es2015-spread', {
      //   "loose": true
      // }]
    ]
  },

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  }
}