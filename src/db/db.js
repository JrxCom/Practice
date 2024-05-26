/* 引入数据库模块 */
const mysql = require('mysql')
/* 连接数据库 */
const db = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'123456',
    database:'learner'
})

/* 共享数据库连接 */
module.exports = db