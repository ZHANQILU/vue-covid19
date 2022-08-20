const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      // 这里写了前缀（对应@/api/index） 在.vue中通过加不加前缀来控制走不走代理服务器
      '/api1': {
        target: 'http://apis.juhe.cn',
        // 转发的时候要去掉前缀 路径重写:正则匹配所有以proxy开头的字符串 修改为空字符串
        pathRewrite: { '^/api1': '' }
        // ws: true, //用于支持websocket
        // changeOrigin: true //用于控制请求头中的host值
      },
      '/api2': {
        target: 'https://interface.sina.cn/news/wap/fymap2020_data.d.json',
        pathRewrite: { '^/api2': '' }
      }
    }
  }
})
