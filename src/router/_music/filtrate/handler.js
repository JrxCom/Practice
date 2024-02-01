// 引入数据库连接
const db = require('../../../db/db')
// 引入表单校验
const Music_Service = require('./service')
/**
 *@ @method (标签管理api方法)
 *? GetFiltrate-----获取类别信息
 *? AddFiltrate-----添加类别信息
 *? EditFiltrate-----修改类别信息
 *? DeleteFiltrate-----删除类别信息
 *  //GetLabel-----获取标签信息
 *? AddLabel-----添加标签信息
 *? EditLabel-----修改标签信息
 *? DeleteLabel-----删除标签信息
 */
exports.GetFiltrate = (req, res) => {
  const sql = `SELECT * FROM music.music_filtrate ORDER BY creat_time DESC`
  db.query(sql, (err, results) => {
    if (results) {
      const sql_sub = `SELECT * FROM music.music_label ORDER BY creat_time DESC`
      db.query(sql_sub, (err_sub, results_sub) => {
        if (results_sub) {
          results.map((i => {
            i['chidren'] = []
            results_sub.map((j => {
              if (i.id == j.p_id) {
                i.chidren.push(j)
              }
            }))
          }))
          return res.send({
            status: 200,
            obj: { records: results }
          })
        }
        if (err_sub) {
          return res.send({
            status: 500,
            message: "数据库连接失败!"
          })
        }
      })
    }
    if (err) {
      return res.send({
        status: 500,
        message: "数据库连接失败!"
      })
    }
  })
}
exports.AddFiltrate = async (req, res) => {
  //3位
  const createrId = () => {
    const id = Math.random().toString().slice(2, 5)
    const sql = `SELECT * FROM music.music_filtrate WHERE id = ?`
    db.query(sql, [id], (err, results) => {
      if (results.length > 0) {
        createrId()
      } else {
        return id
      }
    })
    return id
  }
  const data = {
    id: createrId().toString(),
    name: req.body.name,
    creat_time: new Date().toLocaleString()
  }
  try {
    await Music_Service.add_filtrate.validateAsync(data)
  }
  catch (error) {
    return res.send({
      status: 500,
      message: error.message
    })
  }
  //表单数据添加到数据库
  const sql = 'INSERT INTO music.music_filtrate SET ?'
  db.query(sql, data, (err, results) => {
    if (results) return res.send({ state: 200, message: '类别添加成功。' })
    if (err) return res.send({ status: 500, message: "数据库连接失败!" })
  })
}
exports.EditFiltrate = async (req, res) => {
  const id = req.query.id
  const data = req.body
  const sql = `UPDATE music.music_filtrate SET ? WHERE id = ?`
  try {
    await Music_Service.edit_filtrate.validateAsync(data)
  }
  catch (error) {
    return res.send({
      status: 500,
      message: error.message
    })
  }
  db.query(sql, [data, id], (err, results) => {
    if (results) return res.send({ state: 200, message: '标签修改成功。' })
    if (err) return res.send({ status: 500, message: "数据库连接失败!" })
  })
}
exports.DeleteFiltrate = (req, res) => {
  const id = req.body.id
  const sql = `DELETE FROM music.music_filtrate WHERE id IN (${id})`
  db.query(sql, [id], (err, results) => {
    if (results) return res.send({ state: 200, message: '类别删除成功。' })
    if (err) return res.send({ status: 500, message: "数据库连接失败!" })
  })
}
exports.GetLabel = (req, res) => {
  const pid = req.query.pid
  const sql = `SELECT * FROM music.music_label WHERE p_id = ? ORDER BY creat_time DESC`
  db.query(sql, [pid], (err, results) => {
    if (results) return res.send({ status: 200, obj: { records: results } })
    if (err) return res.send({ status: 500, message: "数据库连接失败!" })
  })
}
exports.AddLabel = async (req, res) => {
  const f_id = req.query.pid
  //3位
  const createrId = () => {
    const id = Math.random().toString().slice(2, 5)
    const sql = `SELECT * FROM music.music_label WHERE id = ?`
    db.query(sql, [id + f_id], (err, results) => {
      if (results.length > 0) {
        createrId()
      } else {
        return id
      }
    })
    return id
  }
  const data = {
    id: createrId().toString() + f_id,
    p_id: f_id,
    name: req.body.name,
    creat_time: new Date().toLocaleString()
  }
  try {
    await Music_Service.add_label.validateAsync(data)
  }
  catch (error) {
    return res.send({
      status: 500,
      message: error.message
    })
  }
  const sql = 'INSERT INTO music.music_label SET ?'
  db.query(sql, data, (err, results) => {
    if (results) return res.send({ state: 200, message: '标签添加成功。' })
    if (err) return res.send({ status: 500, message: "数据库连接失败!" })
  })
}
exports.EditLabel = async (req, res) => {
  const id = req.query.id
  const data = req.body
  const sql = `UPDATE music.music_label SET ? WHERE id = ?`
  try {
    await Music_Service.edit_label.validateAsync(data)
  }
  catch (error) {
    return res.send({
      status: 500,
      message: error.message
    })
  }
  db.query(sql, [data, id], (err, results) => {
    if (results) return res.send({ state: 200, message: '标签修改成功。' })
    if (err) return res.send({ status: 500, message: "数据库连接失败!" })
  })
}
exports.DeleteLabel = (req, res) => {
  const id = req.query.id
  const sql = `DELETE FROM music.music_label WHERE id = ?`
  db.query(sql, [id], (err, results) => {
    if (results) return res.send({ state: 200, message: '标签删除成功。' })
    if (err) return res.send({ status: 500, message: "数据库连接失败!" })
  })
}