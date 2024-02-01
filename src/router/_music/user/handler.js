//引入数据库连接
const db = require('../../../db/db')
//引入表单校验
const Music_Service = require('./service')
//引入密码加密模块
const bcrypt = require('bcryptjs')

/**
*@ @method (用户管理api方法)
*? GetUser-----获取用户列表
*? AddUser-----添加用户信息
*? EditUser-----修改用户信息
*? DeleteUser-----删除用户信息
*? BanUser-----禁用用户信息
*/
exports.GetUser = (req, res) => {
  const sql = `SELECT * FROM music.music_user ORDER BY creat_time DESC`
  db.query(sql, (err, results) => {
    if (results) return res.send({ status: 200, obj: { records: results } })
    if (err) return res.send({ status: 500, message: '数据库连接失败!' })
  })
}
exports.AddUser = async (req, res) => {
  //9位
  const createrId = () => {
    const id = Math.random().toString().slice(2, 11)
    const sql_id = `SELECT * FROM music.music_user WHERE u_id = ${id}`
    db.query(sql_id, (err, results) => {
      if (results.length > 0) createrId()
      else return id
    })
    return id
  }
  const data = {
    u_id: createrId().toString(),
    name: req.body.name,
    age: req.body.age,
    sex: req.body.sex,
    address: req.body.address,
    phone: req.body.phone,
    emil: req.body.emil,
    photo: '',
    state: '1',
    creat_time: new Date().toLocaleString(),
    login_time: ''
  }
  try {
    await Music_Service.add_user.validateAsync(data)
  }
  catch (error) {
    return res.send({
      status: 500,
      message: error.message
    })
  }
  //表单数据添加到数据库
  const sql = 'INSERT INTO music.music_user SET ?'
  db.query(sql, data, (err, results) => {
    if (results) {
      const data_sub = {
        u_id: data.u_id,
        password: bcrypt.hashSync(data.u_id + '@abc', 10),
        state: '0'
      }
      const sql_sub = `INSERT INTO music.music_login SET ?`
      db.query(sql_sub, data_sub, (err_sub, results_sub) => {
        if (results_sub) return res.send({ state: 200, message: '用户添加成功。', id: data.u_id })
        if (err_sub) return res.send({ state: 500, message: '数据库连接失败!' })
      })
    }
    if (err) {
      return res.send({
        state: 500,
        message: '数据库连接失败!'
      })
    }
  })
}
exports.EditUser = async (req, res) => {
  const id = req.query.u_id
  const data = req.body
  const sql = `UPDATE music.music_user SET ? WHERE u_id = ?`
  try {
    await Music_Service.edit_user.validateAsync(data)
  }
  catch (error) {
    return res.send({
      status: 500,
      message: error.message
    })
  }
  db.query(sql, [data, id], (err, results) => {
    if (results) return res.send({ state: 200, message: '用户修改成功。' })
    if (err) return res.send({ state: 500, message: '数据库连接失败!' })
  })
}
exports.DeleteUser = (req, res) => {
  const ids = req.body.id
  const sql = `DELETE FROM music.music_user WHERE u_id IN (${ids})`
  db.query(sql, (err, results) => {
    if (results) return res.send({ state: 200, message: '用户删除成功。' })
    if (err) return res.send({ state: 500, message: '数据库连接失败!' })
  })
}
exports.BanUser = (req, res) => {
  const id = req.query.u_id
  const data = req.body
  const message = data.state == '1' ? '该账号已允许使用。' : '该账号已禁止使用。'
  const sql = `UPDATE music.music_user SET ? WHERE u_id = ?`
  db.query(sql, [data, id], (err, results) => {
    if (results) {
      const sql_sub = `INSERT INTO music.music_login SET ? WHERE u_id = ?`
      db.query(sql_sub, [data, id], (err_sub, results_sub) => {
        if (results_sub) return res.send({ state: 200, message })
        if (err_sub) return res.send({ state: 500, message: '数据库连接失败!' })
      })
    }
    if(err){
      res.send({ 
        state: 500, 
        message: '数据库连接失败!' 
      })
    }
  })
}
