// 引入管理统一变量模块
const dotenv = require('dotenv')
// 引入express服务器模块
const express = require('express')
//初始化管理统一变量模块
dotenv.config()
// 初始化express服务器模块
const app = express()
// 初始化api路由
const router = express.Router()
// 配置解析表单数据
app.use(express.urlencoded({ extended: false }))
// 配置访问静态文件路径
app.use(express.static(process.env.APP_ACCESS))
//共享服务器、路由
module.exports = {
    app,
    router
}