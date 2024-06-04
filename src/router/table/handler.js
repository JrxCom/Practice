/* 引入数据库连接 */
const db = require('../../db/db')
/* 引入文件管理模块 */
const fs = require("fs")

/* 获取表列表 */
exports.getTableList = (req, res) => {
    if (req.cookies.cookieCode === undefined) return res.send({ status: 403, message: "登录失效，请重新登录！" })
    db.query(`SELECT * FROM learner.table WHERE wid = ${req.query.wid}`, (err, results) => {
        if (results) res.send({ status: 200, obj: { records: results } })
        if (err) res.send({ status: 500, message: "获取表列表失败！" })
    })
}

/* 添加表信息 */
exports.addTableInfo = (req, res) => {
    if (req.cookies.cookieCode === undefined) return res.send({ status: 403, message: "登录失效，请重新登录！" })
    const data = {
        id: new Date().getTime(),
        wid: req.body['wid'],
        name: req.body['name'],
        describe: req.body['describe'],
        table: req.body['table'],
        creatime: new Date()
    }

    const inspect_name = new Promise((resolve, reject) => {
        db.query(`SELECT * FROM learner.table WHERE name = '${req.body.name}' AND wid = '${req.body.wid}'`, (err, results) => {
            if (results.length <= 0) {
                resolve()
            } else {
                reject('表名称已存在！');
            }
        })
    });

    const inspect_table = new Promise((resolve, reject) => {
        db.query(`SELECT * FROM learner.table WHERE \`table\` = '${req.body.table}' AND wid = '${req.body.wid}'`, (err, results) => {
            if (results.length <= 0) {
                resolve()
            } else {
                reject("数据库表已存在！");
            }
        })
    });

    const get_database = new Promise((resolve) => {
        db.query(`SELECT * FROM learner.web WHERE id = ${req.body['wid']}`, (err, results) => {
            resolve(results[0]['database'])
        })
    });

    Promise.all([inspect_name, inspect_table, get_database]).then((promiseRes) => {
        db.query(`INSERT INTO learner.table SET ?`, data, (err, results) => {
            if (results) {
                db.query(`CREATE TABLE ${promiseRes[2]}.${req.body['table']}  (
                    id bigint NOT NULL COMMENT 'id',
                    creatime datetime NULL COMMENT '创建时间',
                    PRIMARY KEY (id)
                  );`, data, (err, results) => {
                    console.log(err);
                    if (results) {
                        fs.mkdir(`./../upload/${promiseRes[2]}/${req.body['table']}`, () => {
                            res.send({ status: 200, message: "添加表信息成功。" })
                        })
                    }
                    if (err) res.send({ status: 500, message: "添加表信息失败！" })
                })
            }
        })
    }).catch(err => {
        res.send({ status: 500, message: err })
    })

}

/* 获取表信息 */
exports.getTableInfo = (req, res) => {
    if (req.cookies.cookieCode === undefined) return res.send({ status: 403, message: "登录失效，请重新登录！" })
    db.query(`SELECT * FROM learner.table WHERE id = ${req.query.id}`, (err, results) => {
        if (results) res.send({ status: 200, obj: results[0] })
        if (err) res.send({ status: 500, message: "获取表信息失败！" })
    })
}

/* 修改表信息 */
exports.editTableInfo = (req, res) => {
    if (req.cookies.cookieCode === undefined) return res.send({ status: 403, message: "登录失效，请重新登录！" })
    const data = {
        name: req.body['name'],
        describe: req.body['describe'],
        table: req.body['table'],
    }

    const inspect_name = new Promise((resolve, reject) => {
        db.query(`SELECT * FROM learner.table WHERE name = '${req.body.name}' AND wid = '${req.body.wid} AND id ！= ${req.query.id}'`, (err, results) => {
            if (results.length <= 0) {
                resolve()
            } else {
                reject('表名称已存在！');
            }
        })
    });

    const inspect_table = new Promise((resolve, reject) => {
        db.query(`SELECT * FROM learner.table WHERE \`table\` = '${req.body.table}' AND wid = '${req.body.wid} AND id ！= ${req.query.id}'`, (err, results) => {
            if (results.length <= 0) {
                resolve()
            } else {
                reject("数据库表已存在！");
            }
        })
    });

    const get_database = new Promise((resolve) => {
        db.query(`SELECT * FROM learner.web WHERE id = ${req.body['wid']}`, (err, results) => {
            resolve(results[0]['database'])
        })
    });

    const get_table = new Promise((resolve) => {
        db.query(`SELECT * FROM learner.table WHERE id = ${req.query.id}`, (err, results) => {
            resolve(results[0]['table'])
        })
    });

    Promise.all([inspect_name, inspect_table, get_database, get_table]).then((promiseRes) => {
        db.query(`UPDATE learner.table SET ? WHERE id = ${req.query.id}`, data, (err, results) => {
            if (results) {
                db.query(`RENAME TABLE ${promiseRes[2]}.${promiseRes[3]} TO ${promiseRes[2]}.${req.body['table']};`, data, (err, results) => {
                    if (results) {
                        fs.rename(`./../upload/${promiseRes[2]}/${promiseRes[3]}`, `./../upload/${promiseRes[2]}/${req.body['table']}`, () => {
                            res.send({ status: 200, message: "修改表信息成功。" })
                        })
                    }
                    if (err) res.send({ status: 500, message: "修改表信息失败！" })
                })
            }
        })
    }).catch(err => {
        res.send({ status: 500, message: err })
    })
}

/* 删除表信息 */
exports.removeTableInfo = (req, res) => {
    if (req.cookies.cookieCode === undefined) return res.send({ status: 403, message: "登录失效，请重新登录！" })
    const get_database = new Promise((resolve) => {
        db.query(`SELECT * FROM learner.web WHERE id = ${req.query.wid}`, (err, results) => {
            resolve(results[0]['database'])
        })
    });
    const get_table = new Promise((resolve) => {
        db.query(`SELECT * FROM learner.table WHERE id = ${req.query.id}`, (err, results) => {
            resolve(results[0]['table'])
        })
    });
    Promise.all([get_database, get_table]).then((promiseRes) => {
        db.query(`DELETE FROM learner.table WHERE id = ${req.query.id}`, (err, results) => {
            if (results) {
                db.query(`DROP TABLE ${promiseRes[0]}.${promiseRes[1]}`, (err, results) => {
                    if (results) {
                        fs.rmdir(`./../upload/${promiseRes[0]}/${promiseRes[1]}`, () => {
                            res.send({ status: 200, message: "删除表信息成功。" })
                        })
                    }
                    if (err) res.send({ status: 500, message: "删除表信息失败！" })
                })
            }
        })
    }).catch(err => {
        res.send({ status: 500, message: err })
    })
}

