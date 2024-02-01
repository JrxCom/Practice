// 引入数据库连接
const db = require('../../../db/db')
// 引入表单校验
const M_Service = require('./service')
//引入获取文件信息插件
const path = require('path')
//引入上传文件中间件
const multer = require('multer')

/**
 * @method (歌手管理api方法)
 */
//*获取歌手信息
exports.GetSinger = (req, res) => {
  const sql = `SELECT * FROM music.music_singer ORDER BY creat_time DESC`
  db.query(sql, (err, results) => {
    if (results) return res.send({ status: 200, obj: { records: results } })
    if (err) return res.send({ status: 500, message: "数据库连接失败!" })
  })
}
//*上传歌手头像
exports.UploadSinger = (req, res) => {
  const upload = multer({
    storage: multer.diskStorage({
      destination(req, res, cb) {
        // 设置文件存储路径
        cb(null, process.env.APP_UPLOAD_SINGER)
      },
      filename(req, file, cb) {
        // 设置文件名
        let fileData = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname)
        cb(null, file.fieldname + "-" + fileData)
      }
    }),
    fileFilter: (req, file, cb) => {
      if (file.originalname.endsWith('.png') || file.originalname.endsWith('.jpg')) {
        cb(null, true)
      } else {
        cb(null, false)
      }
    },
  }).single('singer')
  upload(req, res, (err) => {
    if (req.file == undefined) {
      return res.send({
        state: 500,
        message: '上传文件类型错误!'
      })
    } else {
      return res.send({
        state: 200,
        url: process.env.APP_READ_SINGER + req.file.filename
      })
    }
  })
}
//*获取歌手类别信息
exports.SelectSingerLabel = (req, res) => {
  const sql = `SELECT column_type FROM information_schema.COLUMNS WHERE DATA_TYPE = 'enum' AND table_name="music_singer" AND column_name="label";`
  db.query(sql, (err, results) => {
    if (results) {
      const arry = results[0].COLUMN_TYPE.slice(5, -1).replace(/'/g, '').split(',')
      return res.send({
        state: 200,
        obj: { records: arry }
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
//*添加歌手信息
exports.AddSinger = async (req, res) => {
  const createrId = () => {
    const id = Math.random().toString().slice(2, 11)
    const sql = `SELECT * FROM music.music_singer WHERE id = ?`
    db.query(sql, [id], (err, results) => {
      if (results.length > 0) {
        createrId()
      } else {
        return id
      }
    })
    return id
  }
  // 添加用户表单
  const data = {
    id: createrId().toString(),
    name: req.body.name,
    photo: req.body.photo,
    intro: req.body.intro,
    label: req.body.label,
    birthday: req.body.birthday,
    creat_time: new Date().toLocaleString(),
  }
  try {
    await M_Service.add_singer.validateAsync(data)
  }
  catch (error) {
    return res.send({
      status: 500,
      message: error.message
    })
  }
  const sql = `INSERT INTO music.music_singer SET ?`
  db.query(sql, data, (err, results) => {
    console.log(err);
    if (results) return res.send({ state: 200, message: '添加成功。' })
    if (err) return res.send({ status: 500, message: "数据库连接失败!" })

  })
}
//*修改歌手信息
exports.EditSinger = async (req, res) => {
  const id = req.query.id
  const data = req.body
  try {
    await M_Service.edit_singer.validateAsync(data)
  }
  catch (error) {
    return res.send({
      status: 500,
      message: error.message
    })
  }
  const sql = `UPDATE music.music_singer SET ? WHERE id = ?`
  db.query(sql, [data, id], (err, results) => {
    if (results) return res.send({ state: 200, message: '修改成功。' })
    if (err) return res.send({ status: 500, message: "数据库连接失败!" })
  })
}
//*删除歌手信息
exports.DeleteSinger = (req, res) => {
  const ids = req.body.id
  const sql = `DELETE FROM music.music_singer WHERE id IN (${ids})`
  db.query(sql, (err, results) => {
    if (results) return res.send({ state: 200, message: '删除成功。' })
    if (err) return res.send({ status: 500, message: "数据库连接失败!" })
  })
}

