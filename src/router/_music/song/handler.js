// 引入数据库连接
const db = require('../../../db/db')
// 引入表单校验
const M_Service = require('./service')
//引入获取文件信息插件
const path = require('path')
//引入上传文件中间件
const multer = require('multer')
// 引入获取媒体时长模块
const media_duration = require('get-video-duration')
/**
 * @method (歌曲管理api方法)
 */
//*获取歌曲
exports.GetSong = (req, res) => {
  const sql = `SELECT * FROM music.music_song ORDER BY creat_time DESC`
  db.query(sql, (err, results) => {
    if (results) return res.send({ status: 200, obj: { records: results } })
    if (err) return res.send({ status: 500, message: "数据库连接失败!" })
  })
}
//*获取歌手下拉
exports.SelectSinger = (req, res) => {
  const sql = `SELECT * FROM music.music_singer ORDER BY creat_time DESC`
  db.query(sql, (err, results) => {
    if (results) {
      new Promise((resolve, reject) => {
        let data = []
        results.forEach(i => {
          data.push({
            id: i.id,
            name: i.name
          })
        })
        resolve(data)
      }).then(selectRes => {
        if (selectRes) return res.send({ status: 200, obj: { records: selectRes } })
        else return res.send({ status: 500, message: "数据库连接失败!" })
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
//*上传歌曲
exports.UploadSong = (req, res) => {
  const upload = multer({
    storage: multer.diskStorage({
      destination(req, res, cb) {
        // 设置文件存储路径
        cb(null, process.env.APP_UPLOAD_SONG)
      },
      filename(req, file, cb) {
        // 设置文件名
        let fileData = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname)
        cb(null, file.fieldname + "-" + fileData)
      }
    }),
    fileFilter: (req, file, cb) => {
      console.log(file.originalname.endsWith('.mp3'));
      if (file.originalname.endsWith('.mp3')) {
        cb(null, true)
      } else {
        cb(null, false)
      }
    },
  }).single('song')
  upload(req, res, (err) => {
    if (req.file == undefined) {
      return res.send({
        state: 500,
        message: '上传文件类型错误!'
      })
    } else {
      media_duration.getVideoDurationInSeconds(
        'http://' + req.hostname + '/' + process.env.APP_READ_SONG + req.file.filename
      ).then((duration) => {
        const hours = parseInt(duration / 3600) < 10 ? '0' + parseInt(duration / 3600) : parseInt(duration / 3600)
        const minute = parseInt(duration / 60 % 60) > 59 ? 59 : parseInt(duration / 60 % 60)
        const second = Math.ceil(duration % 60) > 59 ? 59 : Math.ceil(duration % 60)
        const durationTime = `${hours > 0 ? `${hours}:` : '00'}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`
        return res.send({
          state: 200,
          url: process.env.APP_READ_SONG + req.file.filename,
          duration: durationTime
        })
      })
    }
  })
}
//*上传歌词
exports.UploadLyric = (req, res) => {
  const upload = multer({
    storage: multer.diskStorage({
      destination(req, res, cb) {
        // 设置文件存储路径
        cb(null, process.env.APP_UPLOAD_LYRIC)
      },
      filename(req, file, cb) {
        // 设置文件名
        let fileData = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname)
        cb(null, file.fieldname + "-" + fileData)
      }
    }),
    fileFilter: (req, file, cb) => {
      console.log(file.originalname.endsWith('.lrc'));
      if (file.originalname.endsWith('.lrc')) {
        cb(null, true)
      } else {
        cb(null, false)
      }
    },
  }).single('lyric')
  upload(req, res, (err) => {
    if (req.file == undefined) {
      return res.send({
        state: 500,
        message: '上传文件类型错误!'
      })
    } else {
      return res.send({
        state: 200,
        url: process.env.APP_READ_LYRIC + req.file.filename,
      })
    }
  })
}
//*添加歌曲
exports.AddSong = async (req, res) => {
  const createrId = () => {
    const id = Math.random().toString().slice(2, 11)
    const sql = `SELECT * FROM music.music_song WHERE id = ?`
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
    s_id: req.body.s_id,
    singer: req.body.singer,
    duration: req.body.duration,
    lyric_path: req.body.lyric_path,
    song_path: req.body.song_path,
    creat_time: new Date().toLocaleString(),
  }
  try {
    await M_Service.add_song.validateAsync(data)
  }
  catch (error) {
    return res.send({
      status: 500,
      message: error.message
    })
  }
  const sql = `INSERT INTO music.music_song SET ?`
  db.query(sql, data, (err, results) => {
    if (results) return res.send({state: 200,message: '添加成功。'})
    if (err) return res.send({ status: 500, message: "数据库连接失败!" })
  })
}
//*修改歌曲
exports.EditSong = async (req, res) => {
  const id = req.query.id
  const data = req.body
  const sql = `UPDATE music.music_song SET ? WHERE id = ?`
  try {
    await M_Service.edit_song.validateAsync(data)
  }
  catch (error) {
    return res.send({
      status: 500,
      message: error.message
    })
  }
  db.query(sql, [data, id], (err, results) => {
    if (results) return res.send({state: 200,message: '修改成功。'})
    if (err) return res.send({ status: 500, message: "数据库连接失败!" })
  })
}
//*删除歌曲
exports.DeleteSong = (req, res) => {
  const ids = req.body.id
  const sql = `DELETE FROM music.music_song WHERE id IN (${ids})`
  db.query(sql, (err, results) => {
    if (results) return res.send({state: 200,message: '删除成功。'})
    if (err) return res.send({ status: 500, message: "数据库连接失败!" })
  })
}
