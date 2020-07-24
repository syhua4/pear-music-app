module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 100,
      propList: ['*'],
      exclude: '/src/assets/css/base.scss'
    }
  }
};
