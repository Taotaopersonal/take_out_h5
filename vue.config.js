const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: true,
  devServer: {
    // host: "127.0.0.1",
    port: 3000,
    open: true,
    disableHostCheck: true
  },
  configureWebpack: {
    resolve: {
      alias: {
        'pages': resolve('src/pages'),
        'components': resolve('src/components'),
        'store': resolve('src/store'),
        'http': resolve('src/http'),
        'common': resolve('src/common'),
      }
    },
  }
}
