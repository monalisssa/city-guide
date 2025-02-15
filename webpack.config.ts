import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import Dotenv from 'dotenv-webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { WebpackConfiguration } from 'webpack-cli';

type Mode = 'production' | 'development';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

interface EnvVariables {
  mode: Mode;
  port: number;
}

module.exports = (env: EnvVariables): Configuration => {
  const isDev = env.mode === 'development';
  return {
    mode: env.mode ?? 'development',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[contenthash].js',
      clean: true,
      publicPath: '/',
    },
    plugins: [
      new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
      isDev && new webpack.ProgressPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash.8].css',
      }),
      new Dotenv(),
    ].filter(Boolean),

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    devtool: isDev ? 'inline-source-map' : false,
    devServer: {
      port: env.port ?? 3013,
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      hot: true,
      open: true,
      historyApiFallback: true,
    },
  };
};
