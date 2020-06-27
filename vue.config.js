module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(html)$/,
          exclude: /node_modules/,
          use: {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        }
      ]
    },
    resolve: {
      alias: {
        assets: '@/assets',
        components: '@/components',
        store: '@/store',
        views: '@/views',
        networks: '@/networks',
        common: '@/common',
        plugin: '@/plugin'
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : ''
};
