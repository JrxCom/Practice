// 引入app文件服务器模块
const { app } = require('./app/app')
// 引入跨域模块
const cors = require('cors')
// 引入路由
const router = require('./router/router')
// 引入token管理模块
const expressJWT = require('express-jwt')

// 配置跨域
app.use(cors())
//配置token管理
app.use(expressJWT.expressjwt({ secret: process.env.APP_CODE, algorithms: ["HS256"] }).unless({ path: [/^\/login/, /^\/M_login/, /^\/V_login/] }))
// 配置路由
app.use(router)
// 配置全局错误中间件
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.send({
      status: 401,
      message: '登录失效,请重新登录!'
    })
  } else {
    res.send({
      status: 500,
      message: '未知错误,请联系管理员!'
    })
  }
})

// 启动服务器
app.listen(process.env.APP_PORT, () => { })