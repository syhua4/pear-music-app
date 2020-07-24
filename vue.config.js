module.exports = {
  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_SERVER_URL,
        https: false,
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
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
  css: {
    loaderOptions: {
      scss: {
        prependData: `
        @import "~assets/css/mixin.scss";
        `
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '',
  transpileDependencies: [
    'swiper', // 将可能不会被编译的依赖写到该数组
    'dom7'
  ]
};
