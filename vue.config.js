const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",

devServer: {
  // 设置为0.0.0.0则所有的地址均能访问
  host: '0.0.0.0',
  port: 8080,
  https: false,
  hotOnly: false,
  // 跨域问题解决 代理（关键部分）

}
})

