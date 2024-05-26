/* 引入app文件服务器模块 */
const { app } = require('./app/app')
/* 引入跨域模块 */
const cors = require('cors')
/* 引入路由 */
const router = require('./router/router')
/* 配置跨域 */
app.use(cors())
/* 配置路由 */
app.use(router)
/* 启动服务器 */
app.listen(8080, () => { 
    console.log('启动成功'+ new Date().getTime());
})