// 引入数据库连接
const db = require('../../db/db')
// 引入表单校验
const _Service = require('./service')
// 引入token管理模块
const jwt = require('jsonwebtoken')

//登录方法
exports.login = async (req, res) => {
  const data = req.body
  const sql = `SELECT * FROM userinfo WHERE u_id = ?`
  //开始登录表单校验
  try {
    await _Service.login.validateAsync(data)
  }
  catch (error) {
    return res.send({
      status: 500,
      message: error.message
    })
  }
  //查询数据库是否存在这个用户，密码是否相等
  db.query(sql, [data.u_id], (err, results) => {
    if (results.length !== 0 && data.password === results[0].password) {
      return res.send({
        status: 200,
        message: '登录成功',
        token: jwt.sign({ u_id: data.u_id }, process.env.APP_CODE)
      })
    } else {
      return res.send({
        status: 500,
        message: '账号或密码错误,请重新输入!'
      })
    }
  })
}

// 获取用户信息
exports.getinfo = (req, res) => {
  const sql = `SELECT u_id,music_state,video_state,theme FROM userinfo WHERE u_id = ?`
  db.query(sql, [req.auth.u_id], (err, results) => {
    return res.send({
      status: 200,
      obj: results[0]
    })
  })
}

//退出登录
exports.logout = (req, res) => {
   res.send({
    status: 200,
    message: '退出成功,即将跳转到登录页。'
  })
  
}