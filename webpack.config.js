
var config = {
    entry: './src/app.js',
    devtool: 'sourcemaps',
    output: {
       path:'/',
       filename: 'bundled.js',
    },
    devServer: {
       inline: true,
       port: 8081
    },
    module: {
       loaders: [
          {
             test: /\.jsx?$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
             query: {
                cacheDirectory: true,
                presets: ['es2015', 'react', 'stage-1']
             }
          }
       ]
    },
    node: {
        net: 'empty'
    }
    
 }
 module.exports = config;