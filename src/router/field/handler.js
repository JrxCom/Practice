/* 引入数据库连接 */
const db = require('../../db/db')

/* 获取字段列表 */
exports.getFieldList = (req, res) => {
    if (req.cookies.cookieCode === undefined) return res.send({ status: 403, message: "登录失效，请重新登录！" })
    db.query(`SELECT * FROM learner.field WHERE tid = ${req.query.tid} ORDER BY creatime ASC`, (err, results) => {
        if (results) res.send({ status: 200, obj: { records: results } })
        if (err) res.send({ status: 500, message: "获取字段列表失败！" })
    })
}

/* 获取关联表信息 */
exports.getSelectTable = (req, res) => {
    if (req.cookies.cookieCode === undefined) return res.send({ status: 403, message: "登录失效，请重新登录！" })
    db.query(`SELECT id,name,\`table\` as value FROM learner.table WHERE wid = ${req.query.wid} ORDER BY creatime ASC`, (err, results) => {
        if (results) {
            results.forEach((item, index) => {
                if (item.id == req.query.tid) {
                    results.splice(index, 1)
                }
            })
            res.send({ status: 200, obj: { records: results } })
        }
        if (err) res.send({ status: 500, message: "获取关联表信息失败！" })
    })
}

/* 获取关联字段信息 */
exports.getSelectField = (req, res) => {
    if (req.cookies.cookieCode === undefined) return res.send({ status: 403, message: "登录失效，请重新登录！" })
    db.query(`SELECT id,name,\`field\` as value FROM learner.field WHERE tid = ${req.query.tid} ORDER BY creatime ASC`, (err, results) => {
        if (results) res.send({ status: 200, obj: { records: results } })
        if (err) res.send({ status: 500, message: "获取关联字段信息失败！" })
    })
}

/* 添加字段信息 */
exports.addFieldInfo = (req, res) => {
    if (req.cookies.cookieCode === undefined) return res.send({ status: 403, message: "登录失效，请重新登录！" })
    const data = {
        id: new Date().getTime(),
        tid: req.body['tid'],
        name: req.body['name'],
        describe: req.body['describe'] || '',
        relevance: +req.body['relevance'],
        creatway: req.body['creatway'],
        showay: req.body['showay'],
        type: req.body['type'] + '',
        size: req.body['size'] + '',
        field: req.body['field'],
        creatime: new Date()
    }
    console.log(data);
    const is_relevance = new Promise((resolve, reject) => {
        console.log(req.body['relevance']);
        if (req.body['relevance'] === '1') {
            console.log(22222);
            let size = ''
            if (req.body['type'] === 'enum' || req.body['type'] === 'set') {
                size = "'" + req.body['size'].split(',').join("','") + "'"
                console.log(size);
            } else if (req.body['type'] === 'bigint' || req.body['type'] === 'datetime') {
                size = 0
            } else {
                size = req.body['size']
            }
            resolve({ type: req.body['type'], size })
        } else {
            db.query(`SELECT * FROM learner.field WHERE id = '${req.body['size']}'`, (err, results) => {
                resolve({ type: results[0].type, size: results[0].size })
            })
        }
    })

    const inspect_name = new Promise((resolve, reject) => {
        db.query(`SELECT * FROM learner.field WHERE name = '${req.body.name}' AND tid = '${req.body.tid}'`, (err, results) => {
            if (results.length <= 0) {
                resolve()
            } else {
                reject('字段名称已存在！');
            }
        })
    });

    const inspect_field = new Promise((resolve, reject) => {
        db.query(`SELECT * FROM learner.field WHERE \`field\` = '${req.body.field}' AND tid = '${req.body.tid}'`, (err, results) => {
            if (results.length <= 0) {
                resolve()
            } else {
                reject("数据库字段已存在！");
            }
        })
    });

    const get_database = new Promise((resolve) => {
        db.query(`SELECT * FROM learner.web WHERE id = ${req.body['wid']}`, (err, results) => {
            resolve(results[0]['database'])
        })
    });

    const get_table = new Promise((resolve) => {
        db.query(`SELECT * FROM learner.table WHERE id = ${req.body['tid']}`, (err, results) => {
            resolve(results[0]['table'])
        })
    });

    Promise.all([is_relevance, inspect_name, inspect_field, get_database, get_table]).then((promiseRes) => {
        console.log(promiseRes);
        db.query(`INSERT INTO learner.field SET ?`, data, (err, results) => {
            if (results) {
                db.query(`ALTER TABLE ${promiseRes[3]}.${promiseRes[4]} ADD COLUMN \`${req.body['field']}\` ${promiseRes[0].type}(${promiseRes[0].size}) COMMENT '${req.body['name']}' AFTER \`creatime\``, (err, results) => {
                    console.log(err);
                    if (results) {
                        db.query(`ALTER TABLE ${promiseRes[3]}.${promiseRes[4]} MODIFY COLUMN creatime datetime(0) DEFAULT NULL COMMENT '创建时间' AFTER ${req.body['field']}`, () => {

                            res.send({ status: 200, message: "添加字段信息成功。" })
                        })
                    }
                    else {
                        res.send({ status: 500, message: "添加字段信息失败！" })
                    }
                })
            }
        })
    }).catch(err => {
        res.send({ status: 500, message: err })
    })

}

/* 获取字段信息 */
exports.getFieldInfo = (req, res) => {
    if (req.cookies.cookieCode === undefined) return res.send({ status: 403, message: "登录失效，请重新登录！" })
    db.query(`SELECT * FROM learner.field WHERE id = ${req.query.id}`, (err, results) => {
        if (results) res.send({ status: 200, obj: results[0] })
        if (err) res.send({ status: 500, message: "获取字段信息失败！" })
    })
}

/* 修改字段信息 */
exports.editFieldInfo = (req, res) => {
    if (req.cookies.cookieCode === undefined) return res.send({ status: 403, message: "登录失效，请重新登录！" })
    const data = {
        name: req.body['name'],
        describe: req.body['describe'] || '',
        creatway: req.body['creatway'],
        showay: req.body['showay'],
        type: req.body['type'],
        size: req.body['size'],
        field: req.body['field'],
    }

    const inspect_name = new Promise((resolve, reject) => {
        db.query(`SELECT * FROM learner.field WHERE name = '${req.body.name}' AND tid = '${req.body.tid}' AND id ！= ${req.query.id}`, (err, results) => {
            if (results.length <= 0) {
                resolve()
            } else {
                reject('字段名称已存在！');
            }
        })
    });

    const inspect_field = new Promise((resolve, reject) => {
        db.query(`SELECT * FROM learner.field WHERE \`field\` = '${req.body.field}' AND tid = '${req.body.tid}' AND id ！= ${req.query.id}`, (err, results) => {
            if (results.length <= 0) {
                resolve()
            } else {
                reject("数据库字段已存在！");
            }
        })
    });

    const get_database = new Promise((resolve) => {
        db.query(`SELECT * FROM learner.web WHERE id = ${req.body['wid']}`, (err, results) => {
            resolve(results[0]['database'])
        })
    });

    const get_table = new Promise((resolve) => {
        db.query(`SELECT * FROM learner.table WHERE id = ${req.body['tid']}`, (err, results) => {
            resolve(results[0]['table'])
        })
    });

    const get_field = new Promise((resolve) => {
        db.query(`SELECT * FROM learner.field WHERE id = ${req.query.id}`, (err, results) => {
            resolve(results[0]['field'])
        })
    });

    Promise.all([inspect_name, inspect_field, get_database, get_table, get_field]).then((promiseRes) => {
        db.query(`UPDATE learner.field SET ? WHERE id = ${req.query.id}`, data, (err, results) => {
            if (results) {
                db.query(`ALTER TABLE ${promiseRes[2]}.${promiseRes[3]} CHANGE COLUMN ${promiseRes[4]} ${req.body['field']} ${req.body['type']}(${req.body['size']}) DEFAULT NULL COMMENT '${req.body['name']}';`, (err, results) => {
                    if (results) res.send({ status: 200, message: "修改字段信息成功。" })
                    if (err) res.send({ status: 500, message: "修改字段信息失败！" })
                })
            }
        })
    }).catch(err => {
        res.send({ status: 500, message: err })
    })
}

/* 删除字段信息 */
exports.removeFieldInfo = (req, res) => {
    if (req.cookies.cookieCode === undefined) return res.send({ status: 403, message: "登录失效，请重新登录！" })
    const get_database = new Promise((resolve) => {
        db.query(`SELECT * FROM learner.web WHERE id = ${req.query.wid}`, (err, results) => {
            resolve(results[0]['database'])
        })
    });

    const get_table = new Promise((resolve) => {
        db.query(`SELECT * FROM learner.table WHERE id = ${req.query.tid}`, (err, results) => {
            resolve(results[0]['table'])
        })
    });

    const get_field = new Promise((resolve) => {
        db.query(`SELECT * FROM learner.field WHERE id = ${req.query.id}`, (err, results) => {
            resolve(results[0]['field'])
        })
    });
    Promise.all([get_database, get_table, get_field]).then((promiseRes) => {
        db.query(`DELETE FROM learner.field WHERE id = ${req.query.id}`, (err, results) => {
            if (results) {
                db.query(`ALTER TABLE ${promiseRes[0]}.${promiseRes[1]} DROP ${promiseRes[2]}`, (err, results) => {
                    if (results) res.send({ status: 200, message: "删除字段信息成功。" })
                    if (err) res.send({ status: 500, message: "删除字段信息失败！" })
                })
            }
        })
    }).catch(err => {
        res.send({ status: 500, message: err })
    })
}

