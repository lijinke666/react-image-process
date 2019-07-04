const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PORT = 8081;

module.exports = env => {
  const mode = (env && env.mode) || 'development';
  const options = {
    entry: path.join(__dirname, '../example/example.js'),
    output: {
      path: path.join(__dirname, '../example/dist'),
      filename: 'build.js',
      publicPath: mode === 'development' ? '' : './example/dist/'
    },
    //模块加载器
    module: {
      rules: [
        {
          test: /\.js[x]?$/,
          use: [
            {
              loader: 'babel-loader'
            }
          ],
          exclude: '/node_modules/'
        },
        {
          test: /\.less$/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: { minimize: false, sourceMap: true }
            },
            { loader: 'less-loader', options: { sourceMap: true } }
          ]
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader' }, //loader 倒序执行  先执行 less-laoder
            {
              loader: 'css-loader',
              options: { minimize: false, sourceMap: true }
            }
          ]
        },
        {
          test: /\.(jpg|jpeg|png|gif|cur|ico)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]' //遇到图片  生成一个images文件夹  名字.后缀的图片
              }
            }
          ]
        },
        {
          test: /\.(eot|ttf|svg|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'fonts/[name][hash:8].[ext]'
              }
            }
          ]
        }
      ]
    },
    //自动补全后缀
    resolve: {
      enforceExtension: false,
      extensions: ['.js', '.jsx', '.json'],
      modules: [path.resolve('src'), path.resolve('.'), 'node_modules']
    },
    devServer: {
      contentBase: path.join(__dirname),
      inline: true,
      port: PORT,
      publicPath: '/dist/',
      historyApiFallback: true,
      stats: {
        color: true,
        errors: true,
        version: true,
        warnings: true,
        progress: true
      }
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          chunksSortMode: 'none'
        }
      }),
      new HtmlWebpackPlugin({
        title: 'demo',
        filename: 'index.html',
        template: path.resolve(__dirname, 'index.html'), //模板文件
        hash: true //添加hash码
      })
    ]
  };
  return options;
};
