const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: true,
  devServer: {
    // host: "127.0.0.1",
    port: 3000,
    // 这种形式只能跨单域,如果有多个资源服务器,需要配置多域,要用对象的形式
    // proxy:"http://localhost:4000",
    proxy: {
      "/4000": {
        target: "http://localhost:4000",
        changeOrigin: true,
        pathRewrite: {
          "^/4000": ""
        }
      }
    },
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
