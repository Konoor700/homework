const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  
  entry: './src/index.js',
  
  
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    clean: true, 
  },

  
  mode: 'development',

  module: {
    rules: [
      {
        
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],

  
  devServer: {
    static: './dist',
    hot: true, 
    open: true, 
    port: 3000,
  },
  
  
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};