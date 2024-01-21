// 引入数据库连接
const db = require('../../db/db')
// 引入表单校验
const M_Service = require('./service')
//引入获取文件信息插件
const path = require('path')
// 引入密码加密模块
const bcrypt = require('bcryptjs')
//引入上传文件中间件
const multer = require('multer')
// 引入获取媒体时长模块
const media_duration = require('get-video-duration')
const { error } = require('console')


/**
 * @method (用户管理api方法)
 */
//*获取用户列表
exports.getUser = (req, res) => {
  const sql = `SELECT * FROM music.music_user ORDER BY creat_time DESC`
  db.query(sql, (err, results) => {
    if (results) {
      return res.send({
        status: 200,
        obj: { records: results }
      })
    }
  })
}
//*添加用户
exports.addUser = async (req, res) => {
  //生成随机9位数字查询数据库中是否存在，存在重新生成，不存在return出去
  const createrId = () => {
    const id = Math.random().toString().slice(2, 11)
    const sql = `SELECT * FROM music.music_user WHERE u_id = ?`
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
  console.log(data);
  //开始表单校验
  try {
    await M_Service.add_user.validateAsync(data)
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
      // 登录表添加相同id用户，密码为用户id@abc，密码进行加密
      const data_sub = {
        u_id: data.u_id,
        password: bcrypt.hashSync(data.u_id + '@abc', 10),
        state: '0'
      }
      const sql_sub = `INSERT INTO music.music_login SET ?`
      db.query(sql_sub, data_sub, () => {
        return res.send({
          state: 200,
          message: '用户添加成功',
          id: data.u_id
        })
      })
    }
  })
}
//*修改用户
exports.editUser = async (req, res) => {
  const id = req.query.u_id
  const data = req.body
  const sql = `UPDATE music.music_user SET ? WHERE u_id = ?`
  //开始表单校验
  try {
    await M_Service.edit_user.validateAsync(data)
  }
  catch (error) {
    return res.send({
      status: 500,
      message: error.message
    })
  }
  //修改用户信息
  db.query(sql, [data, id], (err, results) => {
    if (results) {
      return res.send({
        state: 200,
        message: '用户修改成功'
      })
    }
  })
}
//*删除用户
exports.deleteUser = (req, res) => {
  const id = req.body.id
  const sql = `DELETE FROM music.music_user WHERE u_id IN (${id})`
  db.query(sql, [id], (err, results) => {
    return res.send({
      state: 200,
      message: '用户删除成功'
    })
  })
}
//*禁用用户
exports.banUser = (req, res) => {
  const id = req.query.u_id
  const data = req.body
  const message = data.state == '1' ? '该账号已允许使用' : '该账号已禁止使用'
  const sql = `UPDATE music.music_user SET ? WHERE u_id = ?`
  db.query(sql, [data, id], (err, results) => {
    if (results) {
      const sql_sub = `INSERT INTO music.music_login SET ? WHERE u_id = ?`
      db.query(sql_sub, [data, id], () => {
        return res.send({
          state: 200,
          message
        })
      })
    }
  })
}
/**
 * @method (标签管理api方法)
 */
//*获取父标签
exports.getFiltrate = (req, res) => {
  const sql = `SELECT * FROM music.music_filtrate ORDER BY creat_time DESC`
  db.query(sql, (err, results) => {
    if (results) {
      const sql_sub = `SELECT * FROM music.music_label ORDER BY creat_time DESC`
      db.query(sql_sub, (err, results_sub) => {
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
      })
    }
  })
}
//*添加父标签
exports.addFiltrate = async (req, res) => {
  //生成随机3位数字查询数据库中是否存在，存在重新生成，不存在return出去
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
  // 添加父标签表单
  const data = {
    id: createrId().toString(),
    name: req.body.name,
    creat_time: new Date().toLocaleString()
  }
  //开始表单校验
  try {
    await M_Service.add_filtrate.validateAsync(data)
  }
  catch (error) {
    return res.send({
      status: 500,
      message: error.message
    })
  }
  //表单数据添加到数据库
  const sql = 'INSERT INTO music.music_filtrate SET ?'
  db.query(sql, data, () => {
    return res.send({
      state: 200,
      message: '父标签添加成功'
    })
  })
}
//*修改父标签
exports.editFiltrate = async (req, res) => {
  const id = req.query.id
  const data = req.body
  const sql = `UPDATE music.music_filtrate SET ? WHERE id = ?`
  //开始表单校验
  try {
    await M_Service.edit_filtrate.validateAsync(data)
  }
  catch (error) {
    return res.send({
      status: 500,
      message: error.message
    })
  }
  //修改用户信息
  db.query(sql, [data, id], (err, results) => {
    if (results) {
      return res.send({
        state: 200,
        message: '父标签修改成功'
      })
    }
  })
}
//*删除父标签
exports.deleteFiltrate = (req, res) => {
  const id = req.body.id
  const sql = `DELETE FROM music.music_filtrate WHERE id IN (${id})`
  db.query(sql, [id], (err, results) => {
    if (results) {
      return res.send({
        state: 200,
        message: '父标签删除成功'
      })
    }
  })
}
////获取子标签
exports.getLabel = (req, res) => {
  const pid = req.query.pid
  const sql = `SELECT * FROM music.music_label WHERE p_id = ? ORDER BY creat_time DESC`
  db.query(sql, [pid], (err, results) => {
    if (results) {
      return res.send({
        status: 200,
        obj: { records: results }
      })
    }
  })
}
//*添加子标签
exports.addLabel = async (req, res) => {
  const f_id = req.query.pid
  //生成随机3位数字查询数据库中是否存在，存在重新生成，不存在return出去
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
  // 添加父标签表单
  const data = {
    id: createrId().toString() + f_id,
    p_id: f_id,
    name: req.body.name,
    creat_time: new Date().toLocaleString()
  }
  //开始表单校验
  try {
    await M_Service.add_label.validateAsync(data)
  }
  catch (error) {
    return res.send({
      status: 500,
      message: error.message
    })
  }
  //表单数据添加到数据库
  const sql = 'INSERT INTO music.music_label SET ?'
  db.query(sql, data, (err, results) => {
    return res.send({
      state: 200,
      message: '子标签添加成功'
    })
  })
}
//*修改子标签
exports.editLabel = async (req, res) => {
  const id = req.query.id
  const data = req.body
  const sql = `UPDATE music.music_label SET ? WHERE id = ?`
  //开始表单校验
  try {
    await M_Service.edit_label.validateAsync(data)
  }
  catch (error) {
    return res.send({
      status: 500,
      message: error.message
    })
  }
  //修改用户信息
  db.query(sql, [data, id], (err, results) => {
    if (results) {
      return res.send({
        state: 200,
        message: '子标签修改成功'
      })
    }
  })
}
//*删除子标签
exports.deleteLabel = (req, res) => {
  const id = req.query.id
  const sql = `DELETE FROM music.music_label WHERE id = ?`
  db.query(sql, [id], (err, results) => {
    if (results) {
      return res.send({
        state: 200,
        message: '子标签删除成功'
      })
    }
  })
}
/**
 * @method (歌曲管理api方法)
 */
//*上传歌曲
exports.uploadSong = (req, res) => {
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
exports.uploadLyric = (req, res) => {
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
exports.addSong = (req, res) => {
  const data = req.query.data
  const sql = `INSERT INTO music.music_song SET ?`
  db.query(sql, data, (err, results) => {
    if (results) {
      return res.send({
        state: 200,
        message: '添加成功'
      })
    }
  })
}
//*修改歌曲
exports.editSong = (req, res) => {
  const id = req.params.id
  const data = req.query.data
  const sql = `UPDATE music.music_song SET ? WHERE id = ?`
  db.query(sql, [data, id], (err, results) => {
    if (results) {
      return res.send({
        state: 200,
        message: '修改成功'
      })
    }
  })
}
//*删除歌曲
exports.deleteSong = (req, res) => {
  const id = req.params.id
  const sql = `DELETE FROM music.music_song WHERE id = ?`
  db.query(sql, [id], (err, results) => {
    if (results) {
      return res.send({
        state: 200,
        message: '删除成功'
      })
    }
  })
}
/**
 * @method (歌手管理api方法)
 */
//*获取歌手
exports.getSinger = (req,res) =>{
  const sql = `SELECT * FROM music.music_singer ORDER BY creat_time DESC`
  db.query(sql, (err, results) => {
    if (results) {
      return res.send({
        status: 200,
        obj: { records: results }
      })
    }
  })
}
//*上传歌手头像
exports.uploadSinger = (req, res) => {
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
      console.log(file);
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
//*添加歌曲
exports.addSinger = (req, res) => {
  const data = req.query.data
  const sql = `INSERT INTO music.music_singer SET ?`
  db.query(sql, data, (err, results) => {
    if (results) {
      return res.send({
        state: 200,
        message: '添加成功'
      })
    }
  })
}
//*修改歌曲
exports.editSinger = (req, res) => {
  const id = req.params.id
  const data = req.query.data
  const sql = `UPDATE music.music_singer SET ? WHERE id = ?`
  db.query(sql, [data, id], (err, results) => {
    if (results) {
      return res.send({
        state: 200,
        message: '修改成功'
      })
    }
  })
}
//*删除歌手
exports.deleteSinger = (req, res) => {
  const id = req.params.id
  const sql = `DELETE FROM music.music_singer WHERE id = ?`
  db.query(sql, [id], (err, results) => {
    if (results) {
      return res.send({
        state: 200,
        message: '删除成功'
      })
    }
  })
}