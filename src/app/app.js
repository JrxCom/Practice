/* 引入express服务器模块 */
const express = require('express')
/* 引入cookie模块 */
const cookieParser = require('cookie-parser')
/* 初始化express服务器模块 */
const app = express()
/* 初始化api路由 */
const router = express.Router()
/* 配置解析表单数据 */
app.use(express.urlencoded({ extended: false }))
/* 配置静态访问路径 */
app.use(express.static(__dirname + '../upload'))
/* 配置cookie模块 */
app.use(cookieParser())
/* 打包验证码所需要的字体 */
require('../font/Comismsh.ttf')

module.exports = {
    app,
    router
}