/* 引入app文件路由路由模块 */
const {router} = require('../app/app')

/* log api路径与方法 */
const logRouterPath = require('./log/path')
const logRouterHandler = require('./log/handler')

/* 引入web api路径与方法 */
const WebRouterPath = require('./web/path')
const WebRouterHandler = require('./web/handler')

/* 引入table api路径与方法 */
const tableRouterPath = require('./table/path')
const tableRouterHandler = require('./table/handler')

/* 引入field api路径与方法 */
const fieldRouterPath = require('./field/path')
const fieldRouterHandler = require('./field/handler')

/* 引入data api路径与方法 */
const dataRouterPath = require('./data/path')
const dataRouterHandler = require('./data/handler')

/* 引入上传 api路径与方法 */
const uploadRouterPath = require('./upload/path')
const uploadRouterHandler = require('./upload/handler')

/* log api集合 */
for (item in logRouterPath) {
    router[logRouterPath[item]['method']](logRouterPath[item]['path'],logRouterHandler[item])
}

/* web api集合 */
for (item in WebRouterPath) {
    router[WebRouterPath[item]['method']](WebRouterPath[item]['path'],WebRouterHandler[item])
}

/* table api集合 */
for (item in tableRouterPath) {
    router[tableRouterPath[item]['method']](tableRouterPath[item]['path'],tableRouterHandler[item])
}

/* field api集合 */
for (item in fieldRouterPath) {
    router[fieldRouterPath[item]['method']](fieldRouterPath[item]['path'],fieldRouterHandler[item])
}

/* data api集合 */
for (item in dataRouterPath) {
    router[dataRouterPath[item]['method']](dataRouterPath[item]['path'],dataRouterHandler[item])
}

/* upload api集合 */
router.post(uploadRouterPath['upload'],uploadRouterHandler['upload'])

/* 共享路由 */
module.exports = router

