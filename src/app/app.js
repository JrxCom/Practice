/* 引入express服务器模块 */
const express = require('express')
/* 引入session模块 */
const session = require("express-session");
/* 引入cookie模块 */
const cookieParser  = require('cookie-parser')
/* 初始化express服务器模块 */
const app = express()
/* 初始化api路由 */
const router = express.Router()
/* 配置解析表单数据 */
app.use(express.urlencoded({ extended: false }))
/* 配置静态访问路径 */
app.use(express.static('../upload'))
/* 配置session参数 */
app.use(session({
    name: 'JRX',
    secret: 'session',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 30 * 1000
    }
}))
/* 配置cookie模块 */
app.use(cookieParser())


module.exports = {
    app,
    router
}