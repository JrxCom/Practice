/* 引入express服务器模块 */
const express = require('express')
/* 引入cookie模块 */
const cookieParser = require('cookie-parser')
/* 引入env模块 */
const dotenv = require('dotenv')
/* 初始化express服务器模块 */
const app = express()
/* 初始化api路由 */
const router = express.Router()
/* 初始化env模块 */
dotenv.config()
/* 配置解析表单数据 */
app.use(express.urlencoded({ extended: false }))
/* 配置静态访问路径 */
app.use(express.static(process.env.STATIC_URL))
/* 配置cookie模块 */
app.use(cookieParser())


module.exports = {
    app,
    router
}