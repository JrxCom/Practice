/* 引入数据库模块 */
const mysql = require('mysql')
/* 连接数据库 */
const db = mysql.createPool({
    host:'111.231.15.219',
    port:'3306',
    user:'root',
    password:'jiangruxu.mysql123',
    database:'learner'
})

/* 共享数据库连接 */
module.exports = db