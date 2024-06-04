/* 引入数据库连接 */
const db = require('../../db/db')

/* 引入文件管理模块 */
const fs = require("fs")

/* 获取网站列表 */
exports.getWebList = (req, res) => {
    if (req.cookies.cookieCode === undefined) return res.send({ status: 403, message: "登录失效，请重新登录！" })
    db.query(`SELECT * FROM learner.web`, (err, results) => {
        if (results) res.send({ status: 200, obj: { records: results } })
        if (err) res.send({ status: 500, message: "获取网站列表失败！" })
    })
}

/* 添加网站信息 */
exports.addWebInfo = (req, res) => {
    if (req.cookies.cookieCode === undefined) return res.send({ status: 403, message: "登录失效，请重新登录！" })
    const data = {
        id: new Date().getTime(),
        name: req.body['name'],
        describe: req.body['describe'],
        database: req.body['database'],
        website: req.body['website'],
        logo: req.body['logo'],
        creatime: new Date()
    }
    const inspect_name = new Promise((resolve, reject) => {
        db.query(`SELECT * FROM learner.web WHERE name = '${req.body.name}'`, (err, results) => {
            if (results.length <= 0) {
                resolve()
            } else {
                reject('网站名称已存在！');
            }
        })
    });

    const inspect_database = new Promise((resolve, reject) => {
        db.query(`SELECT * FROM learner.web WHERE \`database\` = '${req.body.database}'`, (err, results) => {
            if (results.length <= 0) {
                resolve()
            } else {
                reject("网站数据库已存在！");
            }
        })
    });

    Promise.all([inspect_name, inspect_database]).then(() => {
        db.query(`INSERT INTO learner.web SET ?`, data, (err, results) => {
            if (results) {
                db.query(`CREATE DATABASE ${req.body['database']}`, data, (err, results) => {
                    if (results) {
                        fs.mkdir(`./../upload/${req.body['database']}`, () => {
                            res.send({ status: 200, message: "添加网站信息成功。" })
                        })
                    }
                    if (err) res.send({ status: 500, message: "添加网站信息失败！" })
                })
            }
        })
    }).catch(err => {
        res.send({ status: 500, message: err })
    })

}

/* 获取网站信息 */
exports.getWebInfo = (req, res) => {
    if (req.cookies.cookieCode === undefined) return res.send({ status: 403, message: "登录失效，请重新登录！" })
    db.query(`SELECT * FROM learner.web WHERE id = ${req.query.id}`, (err, results) => {
        if (results) res.send({ status: 200, obj: results[0] })
        if (err) res.send({ status: 500, message: "获取网站信息失败！" })
    })
}

/* 修改网站信息 */
exports.editWebInfo = (req, res) => {
    if (req.cookies.cookieCode === undefined) return res.send({ status: 403, message: "登录失效，请重新登录！" })
    const data = {
        name: req.body['name'],
        describe: req.body['describe'],
        database: req.body['database'],
        website: req.body['website'],
        logo: req.body['logo']
    }

    const inspect_name = new Promise((resolve, reject) => {
        db.query(`SELECT * FROM learner.web WHERE name = '${req.body.name}' AND id ！= ${req.query.id}`, (err, results) => {
            if (results.length <= 0) {
                resolve()
            } else {
                reject('网站名称已存在！');
            }
        })
    });

    const inspect_database = new Promise((resolve, reject) => {
        db.query(`SELECT * FROM learner.web WHERE \`database\` = '${req.body.database} AND id ！= ${req.query.id}'`, (err, results) => {
            if (results.length <= 0) {
                resolve()
            } else {
                reject("网站数据库已存在！");
            }
        })
    });

    const get_database = new Promise((resolve) => {
        db.query(`SELECT * FROM learner.web WHERE id = ${req.query.id}`, (err, results) => {
            resolve(results[0]['database'])
        })
    });

    Promise.all([inspect_name, inspect_database, get_database]).then((promiseRes) => {
        db.query(`SELECT TABLE_NAME FROM information_schema. TABLES WHERE table_schema = '${promiseRes[2]}'`, (err, results) => {
            let table = results
            db.query(`UPDATE learner.web SET ? WHERE id = ${req.query.id}`, data, (err, results) => {
                if (results) {
                    db.query(`CREATE DATABASE ${req.body['database']};`)
                    if (table.length > 0) {
                        table.forEach(item => {
                            db.query(`RENAME TABLE ${promiseRes[2]}.${item['TABLE_NAME']} TO ${req.body['database']}.${item['TABLE_NAME']};`)
                        });
                    }
                    db.query(`DROP DATABASE ${promiseRes[2]};`, (err, results) => {
                        if (results) {
                            fs.rename(`./../upload/${promiseRes[2]}`, `./../upload/${req.body['database']}`, () => {
                                res.send({ status: 200, message: "修改网站信息成功。" })
                            })
                        }
                        if (err) res.send({ status: 500, message: "修改网站信息失败！" })
                    })
                }
            })
        })

    }).catch(err => {
        res.send({ status: 500, message: err })
    })
}

/* 删除网站信息 */
exports.removeWebInfo = (req, res) => {
    if (req.cookies.cookieCode === undefined) return res.send({ status: 403, message: "登录失效，请重新登录！" })
    const get_database = new Promise((resolve) => {
        db.query(`SELECT * FROM learner.web WHERE id = ${req.query.id}`, (err, results) => {
            resolve(results[0]['database'])
        })
    });
    db.query(`DELETE FROM learner.web WHERE id = ${req.query.id}`, (err, results) => {
        get_database.then(promiseRes => {
            if (results) {
                db.query(`DROP DATABASE ${promiseRes}`, (err, results) => {
                    if (results) {
                        fs.rmdir(`./../upload/${promiseRes}`, () => {
                            res.send({ status: 200, message: "删除网站信息成功。" })
                        })
                    }
                    if (err) res.send({ status: 500, message: "删除网站信息失败！" })
                })
            }
        })
    })
}